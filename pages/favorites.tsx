import Heading from "../ui/Heading";
import Checklist from "../components/Checklist";
import ChecklistCard from "../components/ChecklistCard";
import { useState, useContext, useEffect } from "react";
import Text from "../ui/Text";
import Spinner from "../ui/Spinner";

import { doc, updateDoc, arrayUnion, arrayRemove, increment, collection, query, limit, onSnapshot, where, documentId } from "firebase/firestore";

import { FirebaseContext } from "../components/Layout";
import { useRouter } from "next/router";

const CHECKLISTS_TO_LOAD = 9

export default function Favorites(){
    const { db, userDoc } = useContext(FirebaseContext)
    const [loading, setLoading] = useState(true)
    const [checklists, setChecklists] = useState<Checklist[]>([])
    const router = useRouter()

    useEffect(() => {
        if(userDoc.favoritedChecklists.length === 0){
            setLoading(false)
            return
        }

        const checklistsCollectionRef = collection(db, 'checklists')
        const q = query(checklistsCollectionRef, where(documentId(), 'in', userDoc.favoritedChecklists), limit(CHECKLISTS_TO_LOAD))

        const unsub = onSnapshot(q, (querySnapshot) => {
            let temp: Checklist[] = []
            querySnapshot.forEach((doc) => {
                temp.push({...doc.data() as Checklist, docId: doc.id })
            })
            setChecklists(temp)
            setLoading(false)
        })
        
        return () => unsub()
}, [])

    const onFavorite = (newValue: boolean, docId: string) => {
        const userDocRef = doc(db, 'users', userDoc.uid)
        const checklistDocRef = doc(db, 'checklists', docId)

        updateDoc(userDocRef, {
            favoritedChecklists: arrayRemove(docId)
        })
        updateDoc(checklistDocRef, {
            favorites: increment(-1)
        })
    }

    if(loading) return <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-700"><Spinner /></div>

    return (
        <div className="relative grid h-full grid-cols-1 gap-4 p-4 md:p-8 lg:gap-8 md:grid-cols-2 lg:grid-cols-3 bg-gray-50 dark:bg-gray-700">
            { checklists.map((props: Checklist, i) => <ChecklistCard isPrivate={props.private} favorites={props.favorites} onFavorite={onFavorite} favoritedByUser={userDoc.favoritedChecklists.includes(props.docId)} {...props} key={i} />) }
            { checklists.length === 0 && <Text className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">You haven't favorited any checklists yet. <span className="underline cursor-pointer hover:no-underline" onClick={() => router.push("/")}>Browse</span></Text> }
        </div>
    )
}