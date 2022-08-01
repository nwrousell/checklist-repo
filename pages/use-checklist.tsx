import { useContext, useEffect, useReducer, useState } from "react"
import Checklist from "../components/Checklist"
import Heading from "../ui/Heading"
import Text from "../ui/Text"
import HR from "../ui/HR"
import Spinner from "../ui/Spinner"
import Badge from "../ui/Badge"
import Head from "next/head"

import { AiFillHeart } from 'react-icons/ai'

import { FirebaseContext } from "../components/Layout"
import { doc, Firestore, getDoc, increment, updateDoc } from "firebase/firestore"
import { User } from "../hooks/useUserDoc"

export default function UseChecklist({ }) {
    const [checklist, setChecklist] = useState<Checklist>()
    const [error, setError] = useState('')
    const { db, userDoc } = useContext(FirebaseContext)

    useEffect(() => {
        async function getChecklist() {
            const checklistDocId = window.location.href.split("=")[1]
            const checklistDocRef = doc(db, 'checklists', checklistDocId)


            const snapshot = await getDoc(checklistDocRef)
            if (!snapshot.exists()) {
                setError('This checklist no longer exists.')
                return
            }

            // ! - this is forbidding me when it shouldn't sometimes
            const notAllowed = (snapshot.data().private && !userDoc.createdChecklists.includes(checklistDocId))
            if (notAllowed) {
                setError('This checklist is private. Log in with the correct account if you created it.')
            } else setChecklist(snapshot.data() as Checklist)
        }

        getChecklist()
    }, [userDoc])

    if (error) return <div className="flex items-center justify-center h-full text-center"><Heading>{error}</Heading></div>
    if (checklist === undefined) return <div className="flex items-center justify-center h-full"><Spinner /></div>

    return (
        <div className="h-full">
            <Head>
                <title>Checklist Repo - {checklist.title}</title>
            </Head>
            {
                checklist.tags.length > 0 && (<div className="flex py-2">
                    {checklist.tags.map((title, i) => <Badge key={i} title={title} className="mr-1" />)}
                </div>)
            }
            <div className="flex flex-wrap justify-between mb-2">
                <Heading className="mr-4">{checklist.title}</Heading>
                <div className="flex items-center ">
                    <Text className="font-semibold">{checklist.favorites}</Text>
                    <AiFillHeart size={18} className="ml-1 text-red-500" />
                </div>
            </div>
            <Text small>{checklist.description}</Text>
            <HR />
            <Checklist onItemCompleted={(value) => onItemCompleted(value, db, userDoc)} onChecklistCompleted={(value) => onChecklistCompleted(value, db, userDoc)} items={checklist.items} large />
        </div>
    )
}

function onItemCompleted(value: number, db: Firestore, userDoc: User) {
    if (!userDoc.exists) return

    const userDocRef = doc(db, 'users', userDoc.uid)

    updateDoc(userDocRef, {
        itemsCompleted: increment(value)
    })
}

function onChecklistCompleted(value: number, db: Firestore, userDoc: User) {
    if (!userDoc.exists) return

    const userDocRef = doc(db, 'users', userDoc.uid)

    updateDoc(userDocRef, {
        checklistCompletions: increment(value)
    })
}