import { useContext, useState, useEffect } from "react"
import Checklist from "../components/Checklist"
import ChecklistCard from "../components/ChecklistCard"
import Text from "../ui/Text"

import { collection, query, where, documentId, limit, onSnapshot, updateDoc, increment, arrayUnion, arrayRemove, doc } from "firebase/firestore"

import { FirebaseContext } from "../components/Layout"
import { useRouter } from "next/router"


const CHECKLISTS_TO_LOAD = 9

export default function MyChecklists() {
    const { db, userDoc } = useContext(FirebaseContext)
    const [checklists, setChecklists] = useState<Checklist[]>([])
    const router = useRouter()

    useEffect(() => {
        if (userDoc.createdChecklists.length === 0) return
        
        const checklistsCollectionRef = collection(db, 'checklists')
        const q = query(checklistsCollectionRef, where(documentId(), 'in', userDoc.createdChecklists), limit(CHECKLISTS_TO_LOAD))

        const unsub = onSnapshot(q, (querySnapshot) => {
            let temp: Checklist[] = []
            querySnapshot.forEach((doc) => {
                temp.push({ ...doc.data() as Checklist, docId: doc.id })
            })
            setChecklists(temp)
        })

        return () => unsub()
    }, [])

    const onFavorite = (newValue: boolean, docId: string) => {
        const userDocRef = doc(db, 'users', userDoc.uid)
        const checklistDocRef = doc(db, 'checklists', docId)

        switch (newValue) {
            case true:
                updateDoc(userDocRef, {
                    favoritedChecklists: arrayUnion(docId)
                })
                updateDoc(checklistDocRef, {
                    favorites: increment(1)
                })
                break
            case false:
                updateDoc(userDocRef, {
                    favoritedChecklists: arrayRemove(docId)
                })
                updateDoc(checklistDocRef, {
                    favorites: increment(-1)
                })
                break
        }
    }

    return (
        <div className="relative grid h-full grid-cols-1 gap-4 p-4 md:p-8 lg:gap-8 md:grid-cols-2 lg:grid-cols-3 bg-gray-50 dark:bg-gray-700">
            {checklists.map((props: Checklist, i) => <ChecklistCard onFavorite={onFavorite} favoritedByUser={userDoc.favoritedChecklists.includes(props.docId)} {...props} key={i} />)}
            { checklists.length === 0 && <Text className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">You haven't created any checklists yet. <span className="underline cursor-pointer hover:no-underline" onClick={() => router.push("/create-checklist")}>Create your first.</span></Text> }
        </div>
    )
}