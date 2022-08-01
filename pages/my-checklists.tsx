import { useContext, useState, useEffect } from "react"
import Checklist from "../components/Checklist"
import ChecklistCard from "../components/ChecklistCard"
import Text from "../ui/Text"
import Head from "next/head"

import { updateDoc, doc, deleteDoc } from "firebase/firestore"

import { FirebaseContext } from "../components/Layout"
import { useRouter } from "next/router"
import Modal from "../ui/Modal"
import ChecklistLoader from "../components/ChecklistLoader"



export default function MyChecklists() {
    const { db, userDoc } = useContext(FirebaseContext)
    // const [loading, setLoading] = useState(true)
    const [checklistToDelete, setChecklistToDelete] = useState({ title: '', docId: '' })


    const handleDelete = async () => {
        // setLoading(true)
        const checklistDocRef = doc(db, 'checklists', checklistToDelete.docId)
        deleteDoc(checklistDocRef)

        const newCreatedChecklists = userDoc.createdChecklists
        newCreatedChecklists.splice(newCreatedChecklists.findIndex((value) => value==checklistToDelete.docId), 1)

        const userDocRef = doc(db, 'users', userDoc.uid)
        await updateDoc(userDocRef, { createdChecklists: newCreatedChecklists })

        // setLoading(false)
        setChecklistToDelete({title: '', docId: ''})
    }

    return (
        <>
            <Head>
                <title>Checklist Repo - My Checklists</title>
            </Head>
            <ChecklistLoader onDelete={({docId, title}) => setChecklistToDelete({docId, title})} db={db} userDoc={userDoc} state='user-created' />
            { checklistToDelete.title !== '' && <Modal content={<Text>Are you sure you want to delete <span className="font-bold">{checklistToDelete.title}</span>?</Text>} close={() => setChecklistToDelete({title: '', docId: ''})} danger action={handleDelete} actionTitle='Delete' />}
        </>
    )
}