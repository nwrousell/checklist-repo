import { useEffect, useState } from "react"
import Checklist from "../components/Checklist"
import Heading from "../ui/Heading"
import Text from "../ui/Text"
import HR from "../ui/HR"

import { AiFillHeart } from 'react-icons/ai'

const DUMMY_CHECKLIST: Checklist = {
    title: 'How to cook an omelette',
    description: 'How to cook a french-style omelette. Pretty quick.',
    author: 'Noah Rousell',
    private: false,
    items: [
        { title: 'Gather ingredients' },
        { title: 'Crack eggs', subText: "Not too hard" },
        { title: 'Whisk eggs' },
        { title: 'Heat up pan' },
    ],
    tags: [],
    hearts: 52,
}

export default function UseChecklist({ }) {
    const [checklistProps, setChecklistProps] = useState(DUMMY_CHECKLIST)

    useEffect(() => {
        console.log("hello world")
        // TODO - parse checklist id from URL, load data, and check permission
    })

    return (
        <div className="h-full">
            <div className="flex flex-wrap justify-between mb-2">
                <Heading className="mr-4">{checklistProps.title}</Heading>
                <div className="flex items-center ">
                    <Text className="font-semibold">{ checklistProps.hearts }</Text>
                    <AiFillHeart size={18} className="ml-1 text-red-500" />
                </div>
            </div>
            <Text small>{checklistProps.description}</Text>
            <HR />
            <Checklist items={checklistProps.items} large />
        </div>
    )
}