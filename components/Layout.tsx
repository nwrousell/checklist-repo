import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { AiOutlineStar, AiOutlineUser } from 'react-icons/ai'
import { MdAdd } from 'react-icons/md'
import { RiFileList3Line } from 'react-icons/ri'
import { TbChecklist } from 'react-icons/tb'
import { useDarkMode } from "../hooks/useDarkMode";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getDoc, initializeFirestore, doc, DocumentSnapshot, Firestore, } from 'firebase/firestore'
import { useAuthState } from "react-firebase-hooks/auth";

import { MobileDropDownNav } from "./MobileDropDownNav";
import { MobileTopBar } from "./MobileTopBar";
import { TopBar } from "./TopBar";
import { LeftSidebar } from "./LeftSidebar";
import useUserDoc from "../hooks/useUserDoc";
import type { User } from '../hooks/useUserDoc'

export const LEFT_SIDEBAR_LINKS = [
    {
        title: 'Browse',
        href: "/",
        Icon: RiFileList3Line,
    },
    {
        title: 'Create Checklist',
        href: "/create-checklist",
        Icon: MdAdd,
    },
    {
        title: 'Favorites',
        href: "/favorites",
        Icon: AiOutlineStar,
    },
    {
        title: 'My Checklists',
        href: "/my-checklists",
        Icon: TbChecklist,
    },
    {
        title: 'Profile',
        href: "/profile",
        Icon: AiOutlineUser
    }
]

const PATHNAMES_EXCLUDED_FROM_LAYOUT = ['/login']

const firebaseConfig = {
    apiKey: "AIzaSyCe_5iHGNv7FB-8-TvFctmbut2E3Jt_S6s",
    authDomain: "checklist-repo.firebaseapp.com",
    projectId: "checklist-repo",
    storageBucket: "checklist-repo.appspot.com",
    messagingSenderId: "835904944595",
    appId: "1:835904944595:web:1be99efaf6bc3d34c11726",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = initializeFirestore(app, {})

const blankUserDoc: User = {
    uid: '',
    name: 'Unknown User',
    createdChecklists: [],
    favoritedChecklists: [],
    exists: false,
    checklistCompletions: 0,
    itemsCompleted: 0,
}
export const FirebaseContext = createContext({ auth, db, userDoc: blankUserDoc })

export default function Layout({ children }) {
    const [darkMode, setDarkMode] = useDarkMode()
    const [navOut, setNavOut] = useState(false)
    const router = useRouter()
    const [user, loading, error] = useAuthState(auth)
    const userDoc = useUserDoc(user, db)

    if (PATHNAMES_EXCLUDED_FROM_LAYOUT.includes(router.pathname)) {
        return (
            <FirebaseContext.Provider value={{ auth, db, userDoc }}>
                <div className={`min-h-screen ${darkMode && 'dark bg-gray-800'}`}>
                    {children}
                </div>
            </FirebaseContext.Provider>
        )
    }

    return (
        <FirebaseContext.Provider value={{ auth, db, userDoc }}>
            <div className={`min-h-screen ${darkMode && 'dark bg-gray-800'}`}>
                <div className="hidden md:flex">
                    <LeftSidebar userLoggedIn={user} router={router} links={LEFT_SIDEBAR_LINKS} />
                    <div className="flex flex-col w-full">
                        <TopBar darkMode={darkMode} setDarkMode={setDarkMode} displayName={user && user.displayName} photoURL={user && user.photoURL} />
                        <div className="h-full px-8 pb-8">
                            {children}
                        </div>
                    </div>
                </div>
                <div className="h-full md:hidden">
                    <MobileTopBar setDarkMode={setDarkMode} darkMode={darkMode} setNavOut={setNavOut} navOut={navOut} />
                    {MobileDropDownNav(navOut, router, !!user)}
                    <div className="h-full p-4">
                        {children}
                    </div>
                </div>
            </div>
        </FirebaseContext.Provider>
    )
}
