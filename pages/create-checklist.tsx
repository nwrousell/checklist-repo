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
import { MdAdd } from "react-icons/md";

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

    const saveChecklist = () => {

    }

    return (
        <div className="relative h-full md:grid md:grid-cols-2 md:gap-8">
            <div>
                <Heading>Create Checklist</Heading>
                <HR />
                <TextInput title='Title' setValue={setTitle} className="mb-2" />
                <TextArea title='description' setValue={setDescription} className="mb-2" />
                <Toggle title='Private' setValue={setIsPrivate} />
                {/* <TagsInput onTagsUpdate={setTags} /> */}
                <Button stretch title="Save Checklist" className="hidden mt-4 md:block" onClick={saveChecklist} />
            </div>
            <div>
                <Heading>Checklist Items</Heading>
                <HR />
                { checklist.items.length==0 && <Text className="mb-2" small>No items have been added, click the button below to add the first.</Text> }
                <Checklist items={checklist.items} disabled large />
                <AddButton onClick={() => setItemFormModal(true)} />
                <Button stretch title="Save Checklist" className="mt-4 md:hidden" onClick={saveChecklist} />
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

function AddButton({onClick}){
    return (
        <div className="inline-flex items-center px-4 py-1 border-2 border-gray-200 border-dashed rounded cursor-pointer hover:bg-gray-50" onClick={onClick}>
            <MdAdd
                size={24}
                className="mr-2 text-gray-500"
            />
            <Text className="font-semibold">Add Item</Text>
        </div>
    )
}