import Heading from "../ui/Heading";
import Text from "../ui/Text";
import TextInput from '../ui/TextInput'
import TextArea from '../ui/Textarea'
import Checkbox from '../ui/Checkbox'
import TagsInput from "../components/TagsInput";
import Modal from '../ui/Modal'

import { useEffect, useState, useContext, memo, useMemo } from "react";

import Button from "../ui/Button";
import HR from "../ui/HR";
import Checklist, { ChecklistItem } from "../components/Checklist";
import Toggle from "../ui/Toggle";
import useChecklist from "../hooks/useChecklist";
import { MdAdd } from "react-icons/md";

import { FirebaseContext } from "../components/Layout";
import { addDoc, collection, updateDoc, doc, arrayUnion, getDoc, setDoc } from "firebase/firestore";
import Overlay from "../ui/Overlay";
import Spinner from '../ui/Spinner'
import { ToastSuccess } from '../ui/Toasts'

type PageState = 'creating' | 'starting' | 'loading' | 'editing' | 'adding_doc' | 'success'

export default function CreateChecklist() {
    const { db, userDoc, } = useContext(FirebaseContext)
    const [checklist, setTitle, setDescription, setTags, setIsPrivate, setItems] = useChecklist(userDoc.name)
    const [newItem, setNewItem] = useState<ChecklistItem>(null)

    const [itemFormModal, setItemFormModal] = useState(false)
    const [state, setState] = useState<PageState>('starting')
    const [loadedChecklist, setLoadedChecklist] = useState<Checklist>()

    useEffect(() => {
        if (window.location.href.split("?").length == 1) {
            setState('creating')
            return
        }
        setState('loading')

        async function getChecklist() {
            const checklistDocId = window.location.href.split("=")[1]
            const checklistDocRef = doc(db, 'checklists', checklistDocId)

            const snapshot = await getDoc(checklistDocRef)
            const { title, description, tags, private: isPrivate, items, } = snapshot.data()
            setLoadedChecklist(snapshot.data() as Checklist)

            setTitle(title)
            setDescription(description)
            setTags(tags)
            setIsPrivate(isPrivate)
            setItems(items)

            setState('editing')
        }

        getChecklist()
    }, [])

    const addChecklistItem = (newItem: ChecklistItem) => {
        const temp = []
        for(let item of checklist.items) temp.push(item)

        temp.push(newItem)
        setItems(temp)
    }

    const handleModalAction = () => {
        setItemFormModal(false)
        addChecklistItem(newItem)
    }

    const saveChecklist = async () => {
        if (state === 'adding_doc') return

        const checklistCollectionRef = collection(db, 'checklists')

        switch (state) {
            case 'creating':
                setState('adding_doc')
                const newChecklistDocRef = await addDoc(checklistCollectionRef, { ...checklist, favorites: 0 })

                if (userDoc.exists) {
                    const userDocRef = doc(db, 'users', userDoc.uid)
                    await updateDoc(userDocRef, {
                        createdChecklists: arrayUnion(newChecklistDocRef.id)
                    })
                }
                break;
            case 'editing':
                setState('adding_doc')
                const checklistDocId = window.location.href.split("=")[1]
                const checklistDocRef = doc(db, 'checklists', checklistDocId)
                await setDoc(checklistDocRef, checklist)
        }
        setState('success')
    }

    const onDeleteItem = (index) => {
        console.log("ran: "+index)
        const temp = [...checklist.items]
        temp.splice(index, 1)
        setItems(temp)
    }

    if (state === 'loading' || state === 'starting') return (
        <div className="relative w-full h-full">
            <Overlay light />
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <Spinner />
            </div>
        </div>
    )

    // TODO - figure out how state and re-renders work better (and understand useMemo, memo, and useCallback) 
    // * So I can figure out how to make the toggle load the value correctly (I'm probably not supposed to do it this way and that's why it's hard so find the right way)

    return (
        <div className="relative h-full md:grid md:grid-cols-2 md:gap-8">
            <div>
                <Heading>{state == 'editing' ? 'Edit' : 'Create'} Checklist</Heading>
                <HR />
                <TextInput initialValue={loadedChecklist ? loadedChecklist.title : ''} title='Title' setValue={setTitle} className="mb-2" />
                <TextArea initialValue={loadedChecklist ? loadedChecklist.description : ''} title='description' setValue={setDescription} className="mb-2" />
                <Toggle value={loadedChecklist ? loadedChecklist.private : false} title={`Private ${!userDoc.exists ? '(Must be logged in)' : ''}`} setValue={setIsPrivate} disabled={!userDoc.exists} />
                {/* <TagsInput onTagsUpdate={setTags} /> */}
                <Button stretch title="Save Checklist" className="hidden mt-4 md:block" onClick={saveChecklist} />
            </div>
            <div className="mt-8 md:mt-0">
                <Heading>Checklist Items</Heading>
                <HR />
                {checklist.items.length == 0 && <Text className="mb-2" small>No items have been added, click the button below to add the first.</Text>}
                <Checklist onDelete={onDeleteItem} items={checklist.items} disabled large />
                <AddButton onClick={() => setItemFormModal(true)} />
                <Button stretch title="Save Checklist" className="mt-4 md:hidden" onClick={saveChecklist} />
            </div>

            {(state === 'adding_doc') &&
                <>
                    <Overlay light />
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <Spinner />
                    </div>
                </>
            }
            {state === 'success' &&
                <>
                    <Overlay light />
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <ToastSuccess onClick={() => setState('editing')}>Checklist saved successfully</ToastSuccess>
                    </div>
                </>
            }

            {itemFormModal && <Modal action={handleModalAction} actionTitle="Add Item" content={<TaskForm setTask={setNewItem} />} close={() => setItemFormModal(false)} />}
        </div>
    )
}

function TaskForm({ setTask }) {
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

function AddButton({ onClick }) {
    return (
        <div className="inline-flex items-center px-4 py-1 border-2 border-gray-200 border-dashed rounded cursor-pointer dark:hover:bg-gray-700 dark:border-gray-600 hover:bg-gray-50" onClick={onClick}>
            <MdAdd
                size={24}
                className="mr-2 text-gray-500"
            />
            <Text className="font-semibold">Add Item</Text>
        </div>
    )
}