import Heading from "../ui/Heading";
import Text from "../ui/Text";
import TextInput from '../ui/TextInput'
import TextArea from '../ui/Textarea'
import Checkbox from '../ui/Checkbox'
import TagsInput from "../components/TagsInput";
import Modal from '../ui/Modal'

import { useEffect, useState } from "react";

import Button from "../ui/Button";
import HR from "../ui/HR";
import Checklist, { ChecklistItem } from "../components/Checklist";
import Toggle from "../ui/Toggle";


export default function CreateChecklist(){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState<string[]>(null)
    const [isPrivate, setIsPrivate] = useState(false)

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
        <div className="md:grid md:grid-cols-2 md:gap-8">
            <div>
                <Heading>Create Checklist</Heading>
                <HR />
                <TextInput title='Title' setValue={setTitle} className="mb-2" />
                <TextArea title='description' setValue={setDescription} className="mb-2" />
                <Toggle title='Private' setValue={setIsPrivate} />
                {/* <TagsInput onTagsUpdate={setTags} /> */}
            </div>
            <div>
                <Heading>Checklist Items</Heading>
                <HR />
                { items.length==0 && <Text className="mb-2" small>No items have been added, click the button below to add the first.</Text> }
                <Checklist items={items} disabled large />
                <Button title="Add Item" onClick={() => setItemFormModal(true)} />
            </div>

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