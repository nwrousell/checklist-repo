import Heading from "../ui/Heading";
import Text from "../ui/Text";
import TextInput from '../ui/TextInput'
import TextArea from '../ui/Textarea'
import Checkbox from '../ui/Checkbox'
import TagsInput from "../components/TagsInput";
import Modal from '../ui/Modal'

import { useEffect, useState } from "react";

import type { Checklist, ChecklistItem } from "../types";
import Button from "../ui/Button";

export default function CreateChecklist(){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState<string[]>(null)

    const [newItem, setNewItem] = useState<ChecklistItem>(null)
    const [items, setItems] = useState<ChecklistItem[]>([])

    const [itemFormModal, setItemFormModal] = useState(false)

    const addChecklistItem = () => {
        const temp = []
        for(let item of items) temp.push(item)

        temp.push(newItem)
        setItems(temp)

        setItemFormModal(false)
    }

    return (
        <div className="p-4">
            <TextInput title='Title' setValue={setTitle} className="mb-2" />
            <TextArea title='description' setValue={setDescription} className="mb-2" />
            <TagsInput onTagsUpdate={setTags} />
            
            <Heading>Checklist Items</Heading>
            { items.length==0 && <Text className="mb-2" small>No items have been added, click the button below to add the first.</Text> }
            { items.map((props, i) => <Checkbox {...props} disabled className="my-4" />) }
            <Button title="Add Item" onClick={() => setItemFormModal(true)} />

            { itemFormModal && <Modal action={addChecklistItem} actionTitle="Add Item" content={<TaskForm setTask={setNewItem} />} close={() => setItemFormModal(false)} /> }
        </div>
    )
}
function TaskForm({ setTask }){
    const [title, setTitle] = useState(null)
    const [subText, setSubText] = useState(null)

    useEffect(() => setTask({ title, subText }), [title, subText])

    return (
        <div className="w-64">
            <Heading>Add Item</Heading>
            <TextInput title="Title" setValue={setTitle} className="mb-2" />
            <TextArea title="Subtext" setValue={setSubText} />
        </div>
    )
}