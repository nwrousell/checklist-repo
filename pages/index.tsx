import type { NextPage } from 'next'
import { useState } from 'react'
import Checklist, { ChecklistItem } from '../components/Checklist'

import ChecklistCard from '../components/ChecklistCard'

const DUMMY_CHECKLISTS: Checklist[] = [
    {
        title: 'How to cook an omelette',
        description: 'How to cook a french-style omelette. Pretty quick.',
        items: [
            {title: 'Gather ingredients' },
            {title: 'Crack eggs', subText: "Not too hard" },
            {title: 'Whisk eggs' },
            {title: 'Heat up pan' },
        ],
        tags: [],
        hearts: 52,
    },
    {
        title: 'How to cook an omelette',
        description: 'How to cook a french-style omelette. Pretty quick.',
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

const Home: NextPage = () => {

    return (
        <div className="grid h-full grid-cols-1 gap-4 p-4 md:p-8 lg:gap-8 md:grid-cols-2 lg:grid-cols-3 bg-gray-50 dark:bg-gray-700">
            { DUMMY_CHECKLISTS.map((props: Checklist, i) => <ChecklistCard {...props} key={i} />) }
        </div>
    )
}



export default Home
