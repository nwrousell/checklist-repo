import { useContext, useEffect, useState } from "react"
import Checklist from "../components/Checklist"
import Heading from "../ui/Heading"
import Text from "../ui/Text"
import HR from "../ui/HR"
import Spinner from "../ui/Spinner"

import { AiFillHeart } from 'react-icons/ai'

import { FirebaseContext } from "../components/Layout"
import { doc, getDoc } from "firebase/firestore"

export default function UseChecklist({ }) {
    const [checklist, setChecklist] = useState<Checklist>()
    const [error, setError] = useState('')
    const { db, userDoc } = useContext(FirebaseContext)

    useEffect(() => {
        async function getChecklist(){
            const checklistDocId = window.location.href.split("=")[1]
            const checklistDocRef = doc(db, 'checklists', checklistDocId)


            const snapshot = await getDoc(checklistDocRef)
            if(!snapshot.exists()){
                setError('This checklist no longer exists.')
                return
            }

            const userHasAccess = !(snapshot.data().private && !userDoc.createdChecklists.includes(checklistDocId))
            if(!userHasAccess){
                setError('This checklist is private. Log in with the correct account if you created it.')
            }else setChecklist(snapshot.data() as Checklist)
        }

        getChecklist()
    }, [])

    if(error) return <div className="flex items-center justify-center h-full"><Heading>{ error }</Heading></div>
    if(checklist === undefined) return <div className="flex items-center justify-center h-full"><Spinner /></div>

    return (
        <div className="h-full">
            <div className="flex flex-wrap justify-between mb-2">
                <Heading className="mr-4">{checklist.title}</Heading>
                <div className="flex items-center ">
                    <Text className="font-semibold">{ checklist.favorites }</Text>
                    <AiFillHeart size={18} className="ml-1 text-red-500" />
                </div>
            </div>
            <Text small>{checklist.description}</Text>
            <HR />
            <Checklist items={checklist.items} large />
        </div>
    )
}
