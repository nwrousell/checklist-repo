import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import Checklist, { ChecklistItem } from '../components/Checklist'

import { query, limit, collection, getDocs } from 'firebase/firestore'

import ChecklistCard from '../components/ChecklistCard'

import { FirebaseContext } from '../components/Layout'

const CHECKLISTS_TO_LOAD = 3

const Home: NextPage = () => {
    const { db, userDoc } = useContext(FirebaseContext)
    const [checklists, setChecklists] = useState<Checklist[]>([])

    useEffect(() => {
        async function getChecklists(){
            const checklistsCollectionRef = collection(db, 'checklists')
            const q = query(checklistsCollectionRef, limit(CHECKLISTS_TO_LOAD))
            const querySnapshot = await getDocs(q)
            let temp: Checklist[] = []
            querySnapshot.forEach((doc) => {
                temp.push({...doc.data() as Checklist, docId: doc.id })
            })
            setChecklists(temp)
        }

        getChecklists()
    }, [])

    return (
        <div className="grid h-full grid-cols-1 gap-4 p-4 md:p-8 lg:gap-8 md:grid-cols-2 lg:grid-cols-3 bg-gray-50 dark:bg-gray-700">
            { checklists.map((props: Checklist, i) => <ChecklistCard {...props} key={i} />) }
        </div>
    )
}



export default Home
