import type { ChecklistItem } from "../types"

import Heading from "../ui/Heading"
import Text from "../ui/Text"
import Button from "../ui/Button"
import Checklist from "./Checklist"
import Subheading from '../ui/Subheading'

import { AiFillHeart } from 'react-icons/ai'

export default function ChecklistCard({ title, description, items, hearts, tags }){
    return (
        <div className="overflow-hidden border border-gray-200 rounded-lg dark:border-gray-500 h-min">
            <div className="flex justify-center p-2 overflow-hidden bg-gray-100 dark:bg-gray-600 h-28">
                <div className="mt-4">
                    <Checklist disabled items={items} cutOff={3} />
                    <Text>...</Text>
                </div>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800">
                <div className="flex justify-between">
                    <Subheading >{ title }</Subheading>
                    <div className="flex items-center mb-2">
                        <Text className="font-semibold">{ hearts }</Text>
                        <AiFillHeart size={18} className="ml-1 text-red-500" />
                    </div>
                </div>
                <Text small className="mb-4">{ description }</Text>
                <div className="flex">
                    <Button small title="Check it out" onClick={() => console.log("Go to checklist "+title)} />
                </div>
            </div>
        </div>
    )
}