import Nav from "./Nav";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import HR from '../ui/HR'
import { AiOutlineMenu, AiOutlineStar } from 'react-icons/ai'
import { HiOutlineLogout, HiOutlineClipboardList } from 'react-icons/hi'
import { MdAdd } from 'react-icons/md'
import { BsFillMoonFill } from 'react-icons/bs'
import { BiSun } from 'react-icons/bi'
import { RiFileList3Line } from 'react-icons/ri'

const LEFT_SIDEBAR_LINKS = [
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
]
const PATHNAMES_EXCLUDED_FROM_LAYOUT = ['/login']

export default function Layout({ children }) {
    const [initialLoad, setInitialLoad] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const [navOut, setNavOut] = useState(false)
    const router = useRouter()

    if (PATHNAMES_EXCLUDED_FROM_LAYOUT.includes(router.pathname)) {
        return children
    }

    useEffect(() => {
        // if(typeof window === "undefined") return

        let preference = JSON.parse(localStorage.getItem('darkMode'))
        console.log(preference)
        if(preference !== null) setDarkMode(preference)
    }, [])

    useEffect(() => {
        if(!initialLoad){
            setInitialLoad(true)
            return
        }
        localStorage.setItem("darkMode", JSON.stringify(darkMode))
    }, [darkMode])

    return (
        <div className={`${darkMode && 'dark bg-gray-800'}`}>
            <div className="hidden md:flex">
                <div className="flex flex-col justify-between h-screen p-4 border-r border-gray-200 dark:border-gray-700 w-80">
                    <div>
                        <div className="flex items-center h-14">
                            <Link href="/">
                                <Logo />
                            </Link>
                        </div>
                        <HR />
                        <div >
                            {LEFT_SIDEBAR_LINKS.map((props, i) => <LeftSidebarLink {...props} active={router.pathname === props.href} key={i} />)}
                        </div>
                    </div>
                    <div>
                        <HR />
                        <div>
                            <LogoutButton />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <div className="px-8 py-4">
                        <div className="flex items-center justify-between h-14">
                            <Search className="w-96" />
                            <div className="mr-2">
                                <BiSun onClick={() => setDarkMode(true)} size={28} className={`text-gray-700 cursor-pointer ${darkMode && 'hidden'}`} />
                                <BsFillMoonFill onClick={() => setDarkMode(false)} size={28} className={`text-gray-500 cursor-pointer ${!darkMode && 'hidden'}`} />
                            </div>
                        </div>
                        <HR />
                    </div>
                    <div className="h-full px-8 pb-8">
                        {children}
                    </div>
                </div>
            </div>
            <div className="md:hidden">
                <div className="flex items-center justify-between p-4 border-b-2 border-gray-200">
                    <Logo />
                    <div className="flex items-center">
                        <div className="mr-2">
                                <BiSun onClick={() => setDarkMode(true)} size={42} className={`p-2 rounded text-gray-700 cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 ${darkMode && 'hidden'}`} />
                                <BsFillMoonFill onClick={() => setDarkMode(false)} size={42} className={`p-2 rounded text-gray-500 cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 ${!darkMode && 'hidden'}`} />
                        </div>
                        <AiOutlineMenu onClick={() => setNavOut(!navOut)} size={42} className="p-2 text-gray-700 rounded cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700" />
                    </div> 
                </div>
                <div className={` ${!navOut ? 'hidden' : 'p-4 border-b-2 rounded border-gray-200'}`}>
                    <Search className="mb-2" />
                    {LEFT_SIDEBAR_LINKS.map((props, i) => <LeftSidebarLink {...props} active={router.pathname === props.href} key={i} />)}
                    <HR />
                    <LogoutButton />
                </div>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    )
}

function LeftSidebarLink({ title, Icon, active, href }) {
    return <Link href={href}>
        <div className={`flex items-center p-2 mb-2 rounded cursor-pointer select-none ${active ? 'bg-primary-100 dark:bg-primary-800' : 'group hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
            <Icon size={24} className={`mr-2 ${active ? 'text-primary-700 dark:text-primary-500' : 'text-gray-300 dark:text-gray-500 group-hover:text-gray-400 dark:group-hover:text-gray-400'}`} />
            <p className={`text-lg font-medium ${active ? 'text-primary-700 dark:text-primary-500' : 'text-gray-300 dark:text-gray-500 group-hover:text-gray-400 dark:group-hover:text-gray-400'}`}>{title}</p>
        </div>
    </Link>;
}
function LogoutButton() {
    return (
        <div className={`flex items-center p-2 mb-2 rounded cursor-pointer select-none group hover:bg-gray-100 dark:hover:bg-gray-700`}>
            <HiOutlineLogout size={24} className={`mr-2 text-gray-300 dark:text-gray-500 group-hover:text-gray-400 dark:group-hover:text-gray-400`} />
            <p className={`text-lg font-medium text-gray-300 dark:text-gray-500 group-hover:text-gray-400 dark:group-hover:text-gray-400`}>Log out</p>
        </div>
    )
}
function Logo() {
    return (
        <div className="flex items-center cursor-pointer select-none">
            <HiOutlineClipboardList size={36} className="mr-2 text-primary-700 dark:text-primary-500" />
            <p className="font-mono text-xl font-semibold text-primary-700 dark:text-primary-500">Checklist Repo</p>
        </div>
    )
    
}

function Search({ className = "" }) {
    return (
        <form>
            {/* <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label> */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="search" id="default-search" className={`block w-full p-3 pl-10 text-sm text-gray-900 bg-gray-100 rounded-lg outline-none dark:placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 ${className}`} placeholder="Search..." required />
                {/* <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
            </div>
        </form>
    )
}
