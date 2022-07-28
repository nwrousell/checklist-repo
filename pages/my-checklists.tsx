import { useContext, useState, useEffect } from "react"
import Checklist from "../components/Checklist"
import ChecklistCard from "../components/ChecklistCard"
import Text from "../ui/Text"
import Spinner from "../ui/Spinner"

import { collection, query, where, documentId, limit, onSnapshot, updateDoc, increment, arrayUnion, arrayRemove, doc, deleteDoc } from "firebase/firestore"

import { FirebaseContext } from "../components/Layout"
import { useRouter } from "next/router"
import Modal from "../ui/Modal"


const CHECKLISTS_TO_LOAD = 9

export default function MyChecklists() {
    const { db, userDoc } = useContext(FirebaseContext)
    const [checklists, setChecklists] = useState<Checklist[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const [checklistToDelete, setChecklistToDelete] = useState({ title: '', docId: '' })

    useEffect(() => {
        if (userDoc.createdChecklists.length === 0){
            setLoading(false)
            return
        }

        const checklistsCollectionRef = collection(db, 'checklists')
        const q = query(checklistsCollectionRef, where(documentId(), 'in', userDoc.createdChecklists), limit(CHECKLISTS_TO_LOAD))

        const unsub = onSnapshot(q, (querySnapshot) => {
            let temp: Checklist[] = []
            querySnapshot.forEach((doc) => {
                temp.push({ ...doc.data() as Checklist, docId: doc.id })
            })
            setChecklists(temp)
            setLoading(false)
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

    const handleDelete = async () => {
        setLoading(true)
        const checklistDocRef = doc(db, 'checklists', checklistToDelete.docId)
        deleteDoc(checklistDocRef)

        const newCreatedChecklists = userDoc.createdChecklists
        newCreatedChecklists.splice(newCreatedChecklists.findIndex((value) => value==checklistToDelete.docId), 1)

        const userDocRef = doc(db, 'users', userDoc.uid)
        await updateDoc(userDocRef, { createdChecklists: newCreatedChecklists })

        setLoading(false)
        setChecklistToDelete({title: '', docId: ''})
    }

    if (loading) return <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-700"><Spinner /></div>

    return (
        <>
            <div className="relative grid h-full grid-cols-1 gap-4 p-4 md:p-8 lg:gap-8 md:grid-cols-2 lg:grid-cols-3 bg-gray-50 dark:bg-gray-700">
                {checklists.map((props: Checklist, i) => <ChecklistCard onDelete={(docId, title) => setChecklistToDelete({docId, title})} favorites={props.favorites} canEdit isPrivate={props.private} onFavorite={onFavorite} favoritedByUser={userDoc.favoritedChecklists.includes(props.docId)} {...props} key={i} />)}
                {checklists.length === 0 && <Text className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">You haven't created any checklists yet. <span className="underline cursor-pointer hover:no-underline" onClick={() => router.push("/create-checklist")}>Create your first.</span></Text>}
            </div>
            { checklistToDelete.title !== '' && <Modal content={<Text>Are you sure you want to delete <span className="font-bold">{checklistToDelete.title}</span>?</Text>} close={() => setChecklistToDelete({title: '', docId: ''})} danger action={handleDelete} actionTitle='Delete' />}
        </>
    )
}