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
import Spinner from "../ui/Spinner";
import type { User } from '../hooks/useUserDoc'

const LEFT_SIDEBAR_LINKS = [
    {
        title: 'Browse',
        href: "/",
        Icon: RiFileList3Line,
        accountOnly: false,
    },
    {
        title: 'Create Checklist',
        href: "/create-checklist",
        Icon: MdAdd,
        accountOnly: false,
    },
    {
        title: 'Favorites',
        href: "/favorites",
        Icon: AiOutlineStar,
        accountOnly: true,
    },
    {
        title: 'My Checklists',
        href: "/my-checklists",
        Icon: TbChecklist,
        accountOnly: true,
    },
    {
        title: 'Profile',
        href: "/profile",
        Icon: AiOutlineUser,
        accountOnly: false,
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
export const DarkModeContext = createContext({ darkMode: false })

export default function Layout({ children }) {
    const [darkMode, loaded, setDarkMode] = useDarkMode()
    const [navOut, setNavOut] = useState(false)
    const router = useRouter()
    const [user, loading, error] = useAuthState(auth)
    const userDoc = useUserDoc(user, db)

    // Close mobile nav when you click to a new screen (it's annoying if it stays open)
    useEffect(() => setNavOut(false), [router.pathname])

    if (PATHNAMES_EXCLUDED_FROM_LAYOUT.includes(router.pathname)) {
        return (
            <FirebaseContext.Provider value={{ auth, db, userDoc }}>
                <div className={`min-h-screen ${darkMode && 'dark bg-gray-800'}`}>
                    {children}
                </div>
            </FirebaseContext.Provider>
        )
    }

    const sidebarLinks = userDoc.exists ? LEFT_SIDEBAR_LINKS : LEFT_SIDEBAR_LINKS.filter(({accountOnly}) => !accountOnly)

    return (
        <FirebaseContext.Provider value={{ auth, db, userDoc }}>
            <DarkModeContext.Provider value={{ darkMode }}>
                <div className={`h-max  min-h-screen relative ${darkMode && 'dark bg-gray-800'}`}>
                    <div className="hidden md:flex">
                        <LeftSidebar className="sticky top-0" userLoggedIn={user} router={router} links={sidebarLinks} />
                        <div className="relative flex flex-col w-full">
                            <TopBar className={`sticky top-0 z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'}`} darkMode={darkMode} setDarkMode={setDarkMode} displayName={user && user.displayName} photoURL={user && user.photoURL} />
                            <div className="h-full px-8 pb-8">
                                { children }
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col h-screen md:hidden">
                        <MobileTopBar setDarkMode={setDarkMode} darkMode={darkMode} setNavOut={setNavOut} navOut={navOut} />
                        {MobileDropDownNav(navOut, router, !!user, sidebarLinks)}
                        <div className="flex-auto p-4">
                            { children }
                        </div>
                    </div>
                </div>
            </DarkModeContext.Provider>
        </FirebaseContext.Provider>
    )
}
