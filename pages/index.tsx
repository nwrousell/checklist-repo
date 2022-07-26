import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import Checklist, { ChecklistItem } from '../components/Checklist'

import { query, limit, collection, getDocs } from 'firebase/firestore'

import ChecklistCard from '../components/ChecklistCard'

const DUMMY_CHECKLISTS: Checklist[] = [
    {
        title: 'How to cook an omelette',
        description: 'How to cook a french-style omelette. Pretty quick.',
        author: 'Noah Rousell',
        items: [
            {title: 'Gather ingredients' },
            {title: 'Crack eggs', subText: "Not too hard" },
            {title: 'Whisk eggs' },
            {title: 'Heat up pan' },
        ],
        private: false,
        tags: [],
        hearts: 52,
    },
    {
        title: 'How to cook an omelette',
        description: 'How to cook a french-style omelette. Pretty quick.',
        author: 'Noah Rousell',
        private: false,
        items: [
            {title: 'Gather ingredients' },
            {title: 'Crack eggs', subText: "Not too hard" },
            {title: 'Whisk eggs' },
            {title: 'Heat up pan' },
        ],
        tags: [],
        hearts: 30,
    },
    {
        title: 'How to cook an omelette',
        description: 'How to cook a french-style omelette. Pretty quick.',
        author: 'Noah Rousell',
        private: false,
        items: [
            {title: 'Gather ingredients' },
            {title: 'Crack eggs', subText: "Not too hard" },
            {title: 'Whisk eggs' },
            {title: 'Heat up pan' },
        ],
        tags: [],
        hearts: 20
    },
]

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
