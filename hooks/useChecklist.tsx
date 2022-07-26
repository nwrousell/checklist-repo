import { useEffect, useState } from "react"
import Checklist, { ChecklistItem } from "../components/Checklist"

const BASE_CHECKLIST: Checklist = {
    title: '',
    description: '',
    tags: [],
    private: false,
    items: [],
    author: '',
    hearts: 0
}

export default function useChecklist(author){
    const [checklist, setChecklist] = useState(BASE_CHECKLIST)

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState<string[]>(null)
    const [isPrivate, setIsPrivate] = useState(false)
    const [items, setItems] = useState<ChecklistItem[]>([])

    const addChecklistItem = (newItem: ChecklistItem) => {
        const temp = []
        for(let item of items) temp.push(item)

        temp.push(newItem)
        setItems(temp)
    }

    useEffect(() => {
        const temp: Checklist = {
            title, description, tags, private: isPrivate, items, author, hearts: 0,
        }
        setChecklist(temp)
    }, [title, description, tags, isPrivate, items])

    return [checklist, setTitle, setDescription, setTags, setIsPrivate, addChecklistItem] as const
}