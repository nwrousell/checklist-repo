import Heading from "../ui/Heading";
import Text from "../ui/Text";
import TextInput from '../ui/TextInput'
import TextArea from '../ui/Textarea'
import Checkbox from '../ui/Checkbox'
import TagsInput from "../components/TagsInput";
import Modal from '../ui/Modal'

import { useEffect, useState, useContext } from "react";

import Button from "../ui/Button";
import HR from "../ui/HR";
import Checklist, { ChecklistItem } from "../components/Checklist";
import Toggle from "../ui/Toggle";
import useChecklist from "../hooks/useChecklist";

import { FirebaseContext } from "../components/Layout";

export default function CreateChecklist(){
    const { db, userDoc, } = useContext(FirebaseContext)
    const [checklist, setTitle, setDescription, setTags, setIsPrivate, addChecklistItem] = useChecklist(userDoc.name)
    const [newItem, setNewItem] = useState<ChecklistItem>(null)

    const [itemFormModal, setItemFormModal] = useState(false)

    const handleModalAction = () => {
        setItemFormModal(false)
        addChecklistItem(newItem)
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
                { checklist.items.length==0 && <Text className="mb-2" small>No items have been added, click the button below to add the first.</Text> }
                <Checklist items={checklist.items} disabled large />
                <Button title="Add Item" onClick={() => setItemFormModal(true)} />
            </div>

            { itemFormModal && <Modal action={handleModalAction} actionTitle="Add Item" content={<TaskForm setTask={setNewItem} />} close={() => setItemFormModal(false)} /> }
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