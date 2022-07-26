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
    const [noAccess, setNoAccess] = useState(false)
    const { db, userDoc } = useContext(FirebaseContext)

    useEffect(() => {
        async function getChecklist(){
            const checklistDocId = window.location.href.split("=")[1]
            const checklistDocRef = doc(db, 'checklists', checklistDocId)
            const snapshot = await getDoc(checklistDocRef)

            const userHasAccess = !(snapshot.data().private && !userDoc.createdChecklists.includes(checklistDocId))
            if(!userHasAccess){
                setNoAccess(true)
            }else setChecklist(snapshot.data() as Checklist)
        }

        getChecklist()
    }, [])

    if(checklist === undefined) return <div className="flex items-center justify-center h-full"><Spinner /></div>
    if(noAccess) return <div className="flex items-center justify-center h-full"><Heading>This checklist is private. Log in with the correct account if you created it.</Heading></div>

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
