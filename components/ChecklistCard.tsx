import type { ChecklistItem } from "./Checklist"

import Heading from "../ui/Heading"
import Text from "../ui/Text"
import Button from "../ui/Button"
import Checklist from "./Checklist"
import Subheading from '../ui/Subheading'

import { AiFillHeart, AiOutlineHeart, AiFillLock } from 'react-icons/ai'
import { FiEdit2 } from 'react-icons/fi'
import { useRouter } from "next/router"
import { BiTrash } from "react-icons/bi"
import Badge from "../ui/Badge"

export default function ChecklistCard({ title, description, items, isPrivate, onDelete = null, canEdit = false, favorites, favoritedByUser, onFavorite, tags, docId = "", author }) {
    const router = useRouter()

    return (
        <div className="overflow-hidden border border-gray-200 rounded-lg dark:border-gray-500 h-min">
            <div className="relative flex justify-center p-2 overflow-hidden bg-gray-100 dark:bg-gray-600 h-28">
                <div className="mt-4">
                    <Checklist disabled items={items} cutOff={3} />
                    <Text>...</Text>
                </div>
                {isPrivate && <AiFillLock size={28} className="absolute top-0 right-0 p-1 bg-white shadow dark:bg-gray-700 text-primary-700" />}
            </div>
            <div className="p-4 bg-white dark:bg-gray-800">
                {
                    tags.length > 0 && (<div className="flex py-2">
                        {tags.map((title, i) => <Badge key={i} title={title} className="mr-1" />)}
                    </div>)
                }
                <div className="flex justify-between">
                    <Subheading className="select-none">{title}</Subheading>
                    <div className="flex items-center mb-2 cursor-pointer" onClick={() => onFavorite(!favoritedByUser, docId)}>
                        <Text className="font-semibold select-none">{favorites}</Text>
                        {favoritedByUser ? <AiFillHeart size={18} className="ml-1 text-red-500" /> :
                            <AiOutlineHeart size={18} className="ml-1 text-red-500" />
                        }
                    </div>
                </div>
                <Text small className="mb-4 select-none">{description}</Text>
                <div className="flex items-center justify-between">
                    <Button small title="Check it out" onClick={() => router.push(`/use-checklist?id=${docId}`)} />
                    <div className="flex items-center">
                        {canEdit && <BiTrash onClick={() => onDelete && onDelete(docId, title)} size={24} className="mr-2 text-gray-500 cursor-pointer hover:text-red-500" />}
                        {canEdit && <FiEdit2 onClick={() => router.push(`/create-checklist?id=${docId}`)} size={36} className="p-2 text-gray-500 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300" />}
                    </div>
                </div>
            </div>
        </div >
    )
}