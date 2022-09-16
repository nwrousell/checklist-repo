import Heading from "../ui/Heading";
import Text, { DangerText } from "../ui/Text";
import TextInput from '../ui/TextInput'
import TextArea from '../ui/Textarea'

import Modal from '../ui/Modal'
import Head from "next/head";

import { useEffect, useState, useContext } from "react";

import Button from "../ui/Button";
import HR from "../ui/HR";
import Checklist, { ChecklistItem } from "../components/Checklist";
import Toggle from "../ui/Toggle";
import useChecklist from "../hooks/useChecklist";
import { MdAdd } from "react-icons/md";

import { FirebaseContext, DarkModeContext } from "../components/Layout";
import { addDoc, collection, updateDoc, doc, arrayUnion, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { useDocumentData } from 'react-firebase-hooks/firestore'
import Overlay from "../ui/Overlay";
import Spinner from '../ui/Spinner'
import { ToastSuccess } from '../ui/Toasts'
import { useRouter } from "next/router";
import * as Filter from 'bad-words'
import Creatable from 'react-select/creatable'
import useTags, { transformTagList } from "../hooks/useTags";


const filter = new Filter()

function createCustomSelectStyles(darkMode) {
    return {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: darkMode ? '#1f2937' : 'white',
            border: '2px solid #d1d5db',
            borderWidth: 2,
            borderRadius: state.isFocused ? '0.25rem 0.25rem 0 0' : '0.25rem',
            outline: 'none',
            boxShadow: 'none',
            borderColor: state.isFocused ? '#15803d !important' : darkMode ? '#374151 !important' : '#d1d5db !important',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#22c55e' : darkMode ? '#1f2937' : 'white',
            color: state.isFocused ? 'black' : darkMode ? '#e5e7eb' : 'black'
        }),
        menu: (provided, state) => ({
            borderWidth: 2,
            borderColor: darkMode ? 'green' : '#eee',
            borderTop: 'none',
            borderRadius: '0 0 0.25rem 0.25rem',
            backgroundColor: darkMode ? '#1f2937' : 'white',
            padding: 0,
            margin: 0,
        }),
    }
}

type PageState = 'creating' | 'starting' | 'loading' | 'editing' | 'adding_doc' | 'success'

export default function CreateChecklist() {
    const { db, userDoc, } = useContext(FirebaseContext)
    const tagsList = useTags(db)
    const [checklist, setTitle, setDescription, setTags, setIsPrivate, setItems] = useChecklist(userDoc.name)
    const [newItem, setNewItem] = useState<ChecklistItem>(null)
    const router = useRouter()
    const [profranity, setProfanity] = useState([])
    const { darkMode } = useContext(DarkModeContext)

    const [itemFormModal, setItemFormModal] = useState(false)
    const [state, setState] = useState<PageState>('starting')
    const [loadedChecklist, setLoadedChecklist] = useState<Checklist>()

    const selectCustomStyles = createCustomSelectStyles(darkMode)

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
    }, [userDoc])

    useEffect(() => {
        const temp = []
        if (filter.isProfane(checklist.title)) temp.push('title')
        if (filter.isProfane(checklist.description)) temp.push('description')
        for (let index in checklist.items) {
            if (filter.isProfane(checklist.items[index].title) || filter.isProfane(checklist.items[index].subText)) {
                temp.push(`items`)
            }
        }

        setProfanity(temp)
    }, [checklist])

    const addChecklistItem = (newItem: ChecklistItem) => {
        const temp = []
        for (let item of checklist.items) temp.push(item)

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
                const newChecklistDocRef = await addDoc(checklistCollectionRef, { ...checklist, favorites: 0, createdAt: Timestamp.now() })

                if (userDoc.exists) {
                    const userDocRef = doc(db, 'users', userDoc.uid)
                    await updateDoc(userDocRef, {
                        createdChecklists: arrayUnion(newChecklistDocRef.id)
                    })
                }
                router.push(`/create-checklist?id=${newChecklistDocRef.id}`)
                break;
            case 'editing':
                setState('adding_doc')
                if (window.location.href.split("?").length == 1) return // TODO - this should be better

                const checklistDocId = window.location.href.split("=")[1]
                const checklistDocRef = doc(db, 'checklists', checklistDocId)
                await setDoc(checklistDocRef, checklist, { merge: true })
        }
        setState('success')
    }

    const onDeleteItem = (index) => {
        console.log("ran: " + index)
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

    const createTag = (newTag) => {
        if (filter.isProfane(newTag)) return

        const tagDocRef = doc(db, 'misc', 'tags')
        updateDoc(tagDocRef, {
            tags: arrayUnion(newTag)
        })
    }

    const handleTagChange = (newValue: any[]) => {
        let temp = newValue.map(({ value }) => value)
        if (temp == null) temp = []
        setTags(temp)
    }

    const isValidNewTag = (inputValue) => {
        return (
            !inputValue.includes('+') &&
            !inputValue.includes('?') &&
            !inputValue.includes('=') &&
            !inputValue.includes('-') &&
            inputValue.length > 0 &&
            !filter.isProfane(inputValue)
        )
    }

    // TODO - figure out how state and re-renders work better (and understand useMemo, memo, and useCallback) 
    // * So I can figure out how to make the toggle load the value correctly (I'm probably not supposed to do it this way and that's why it's hard so find the right way)

    return (
        <div className="relative h-full md:grid md:grid-cols-2 md:gap-8">
            <Head>
                <title>Checklist Repo - Create Checklist</title>
            </Head>
            <div>
                <Heading>{state == 'editing' ? 'Edit' : 'Create'} Checklist</Heading>
                <HR />
                <TextInput error={profranity.includes("title") && 'Please remove the profanity'} initialValue={loadedChecklist ? loadedChecklist.title : ''} title='Title' setValue={setTitle} className="mb-2" />
                <TextArea error={profranity.includes('description') && 'Please remove the profanity'} initialValue={loadedChecklist ? loadedChecklist.description : ''} title='description' setValue={setDescription} className="mb-2" />
                <Toggle value={loadedChecklist ? loadedChecklist.private : false} title={`Private ${!userDoc.exists ? '(Must be logged in)' : ''}`} setValue={setIsPrivate} disabled={!userDoc.exists} />
                {/* <TagsInput onTagsUpdate={setTags} /> */}
                <Creatable isValidNewOption={isValidNewTag} onChange={handleTagChange} defaultValue={(loadedChecklist && loadedChecklist.tags) ? transformTagList(loadedChecklist.tags) : []} styles={selectCustomStyles} onCreateOption={createTag} options={tagsList} isMulti />
                {/* <Select styles={selectCustomStyles} onChange={(newValue) => console.log(newValue)} options={tags_list} isMulti /> */}
                <Button stretch disabled={profranity.length > 0} title="Save Checklist" className="hidden mt-4 md:block" onClick={saveChecklist} />
            </div>
            <div className="mt-8 md:mt-0">
                <Heading>Checklist Items</Heading>
                <HR />
                {checklist.items.length == 0 && <Text className="mb-2" small>No items have been added, click the button below to add the first.</Text>}
                <Checklist onDelete={onDeleteItem} items={checklist.items} disabled large />
                {profranity.includes("items") && <DangerText>Please remove the profanity from the item(s).</DangerText>}
                <AddButton onClick={() => setItemFormModal(true)} />
                <Button disabled={profranity.length > 0} stretch title="Save Checklist" className="mt-4 md:hidden" onClick={saveChecklist} />
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
                        <ToastSuccess onClick={() => router.reload()}>Checklist saved successfully</ToastSuccess>
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
