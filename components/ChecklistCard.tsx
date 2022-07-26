import type { ChecklistItem } from "./Checklist"

import Heading from "../ui/Heading"
import Text from "../ui/Text"
import Button from "../ui/Button"
import Checklist from "./Checklist"
import Subheading from '../ui/Subheading'

import { AiFillHeart, AiOutlineHeart, AiFillLock } from 'react-icons/ai'
import { useRouter } from "next/router"

export default function ChecklistCard({ title, description, items, isPrivate, favorites, favoritedByUser, onFavorite, tags, docId="", author }){
    const router = useRouter()

    return (
        <div className="overflow-hidden border border-gray-200 rounded-lg dark:border-gray-500 h-min">
            <div className="relative flex justify-center p-2 overflow-hidden bg-gray-100 dark:bg-gray-600 h-28">
                <div className="mt-4">
                    <Checklist disabled items={items} cutOff={3} />
                    <Text>...</Text>
                </div>
                <AiFillLock size={28} className="absolute top-0 right-0 p-1 bg-white shadow dark:bg-gray-700 text-primary-700" />
            </div>
            <div className="p-4 bg-white dark:bg-gray-800">
                <div className="flex justify-between">
                    <Subheading className="select-none">{ title }</Subheading>
                    <div className="flex items-center mb-2 cursor-pointer" onClick={() => onFavorite(!favoritedByUser, docId)}>
                        <Text className="font-semibold select-none">{ favorites }</Text>
                        { favoritedByUser ? <AiFillHeart size={18} className="ml-1 text-red-500" /> :
                            <AiOutlineHeart size={18} className="ml-1 text-red-500" />
                        }
                    </div>
                </div>
                <Text small className="mb-4 select-none">{ description }</Text>
                <div className="flex">
                    <Button small title="Check it out" onClick={() => router.push(`/use-checklist?id=${docId}`)} />
                </div>
            </div>
        </div>
    )
}