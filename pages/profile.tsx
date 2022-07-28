import { useContext, useState } from "react";
import { FirebaseContext } from "../components/Layout";
import Heading from "../ui/Heading";
import HR from "../ui/HR";
import Subheading from "../ui/Subheading";
import { Stats } from "../ui/Stats";
import { User } from "../hooks/useUserDoc";
import Text from "../ui/Text";
import { useRouter } from "next/router";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import { doc, updateDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { ToastDanger, ToastSuccess } from "../ui/Toasts";
import Overlay from "../ui/Overlay";
import Spinner from "../ui/Spinner";

const DUMMY_STATS = [
    {
        title: 'Checklists Created',
        number: 6,
    },
    {
        title: 'Checklists Favorited',
        number: 32,
    },
    {
        title: 'Checklist Completions',
        number: 128,
    },
    {
        title: 'Items Completed',
        number: 128 * 6,
    },
]

type NameChangeState = 'idle' | 'uploading' | 'error' | 'success'

export default function Profile() {
    const { db, userDoc } = useContext(FirebaseContext)
    const router = useRouter()
    const [newName, setNewName] = useState(userDoc.name)
    const [nameChangeState, setNameChangeState] = useState<NameChangeState>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const saveName = () => {

        setNameChangeState('uploading')
        const userDocRef = doc(db, 'users', userDoc.uid)
        updateDoc(userDocRef, {
            name: newName
        })
            .then(() => setNameChangeState('success'))
            .catch((err: FirebaseError) => {
                setNameChangeState('error')
                setErrorMessage(err.message)
            })
    }

    return (
        <div className="relative h-full">
            <Heading big className="mb-8">Profile</Heading>

            <Subheading>Stats</Subheading>
            <HR />
            {userDoc.exists ? <Stats stats={getStats(userDoc)} /> :
                <Text>You must be logged in to track stats. <span className="underline cursor-pointer hover:no-underline" onClick={() => router.push("/login")}>Login</span></Text>}

            { userDoc.exists && <AccountSection userDoc={userDoc} setNewName={setNewName} newName={newName} saveName={saveName} nameChangeState={nameChangeState} setNameChangeState={setNameChangeState} errorMessage={errorMessage} />}

            {nameChangeState === 'uploading' &&
                <>
                    <Overlay light />
                    <div className="absolute inset-0 z-50 flex items-center justify-center">
                        <Spinner />
                    </div>
                </>
            }
        </div>
    )
}

function getStats(userDoc: User) {
    return [
        {
            title: 'Checklists Created',
            number: userDoc.createdChecklists.length,
        },
        {
            title: 'Checklists Favorited',
            number: userDoc.favoritedChecklists.length,
        },
        {
            title: 'Checklists Completed',
            number: userDoc.checklistCompletions || 0,
        },
        {
            title: 'Items Completed',
            number: userDoc.itemsCompleted || 0,
        },
    ]
}
function AccountSection({ setNewName, newName, saveName, userDoc, nameChangeState, setNameChangeState, errorMessage }) {
    return (<><Subheading className="mt-16">Account</Subheading>
        <HR />
        <div>
            <div className="max-w-md mb-4">
                <TextInput title="Change name" initialValue={userDoc.name} setValue={setNewName} />
            </div>
            <Button title="Save" disabled={userDoc.name == newName} onClick={saveName} />
            {nameChangeState === 'success' && <ToastSuccess onClick={() => setNameChangeState('idle')}>Name successfully changed.</ToastSuccess>}
            {nameChangeState === 'error' && <ToastDanger onClick={() => setNameChangeState('idle')}>Something went wrong: <span className="italic">{errorMessage}</span></ToastDanger>}
        </div></>);
}