import Nav from "./Nav";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import type { NextRouter } from "next/router";

import HR from '../ui/HR'
import { AiOutlineMenu, AiOutlineStar } from 'react-icons/ai'
import { HiOutlineLogout } from 'react-icons/hi'
import { MdAdd } from 'react-icons/md'
import { BsFillMoonFill } from 'react-icons/bs'
import { BiSun } from 'react-icons/bi'
import { RiFileList3Line } from 'react-icons/ri'
import { Logo } from "./Logo";
import { Search } from "./Search";
import { useDarkMode } from "../hooks/useDarkMode";

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
    const [darkMode, setDarkMode] = useDarkMode()
    const [navOut, setNavOut] = useState(false)
    const router = useRouter()

    if (PATHNAMES_EXCLUDED_FROM_LAYOUT.includes(router.pathname)) return children

    return (
        <div className={`min-h-screen ${darkMode && 'dark bg-gray-800'}`}>
            <div className="hidden md:flex">
                <LeftSidebar router={router} links={LEFT_SIDEBAR_LINKS} />
                <div className="flex flex-col w-full">
                    <TopBar darkMode={darkMode} setDarkMode={setDarkMode} />
                    <div className="h-full px-8 pb-8">
                        {children}
                    </div>
                </div>
            </div>
            <div className="h-full md:hidden">
                <MobileTopBar setDarkMode={setDarkMode} darkMode={darkMode} setNavOut={setNavOut} navOut={navOut} />
                {MobileDropDownNav(navOut, router)}
                <div className="h-full p-4">
                    {children}
                </div>
            </div>
        </div>
    )
}

function MobileDropDownNav(navOut: boolean, router: NextRouter) {
    return <div className={` ${!navOut ? 'hidden' : 'p-4 border-b-2 rounded border-gray-200'}`}>
        <Search className="mb-2" />
        {LEFT_SIDEBAR_LINKS.map((props, i) => <LeftSidebarLink {...props} active={router.pathname === props.href} key={i} />)}
        <HR />
        <LogoutButton />
    </div>;
}

function MobileTopBar({setDarkMode, darkMode, setNavOut, navOut}) {
    return <div className="flex items-center justify-between p-4 border-b-2 border-gray-200">
        <Logo />
        <div className="flex items-center">
            <div className="mr-2">
                <BiSun onClick={() => setDarkMode(true)} size={42} className={`p-2 rounded text-gray-700 cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 ${darkMode && 'hidden'}`} />
                <BsFillMoonFill onClick={() => setDarkMode(false)} size={42} className={`p-2 rounded text-gray-500 cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 ${!darkMode && 'hidden'}`} />
            </div>
            <AiOutlineMenu onClick={() => setNavOut(!navOut)} size={42} className="p-2 text-gray-700 rounded cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700" />
        </div>
    </div>;
}

function TopBar(setDarkMode, darkMode: boolean) {
    return <div className="px-8 py-4">
        <div className="flex items-center justify-between h-14">
            <Search className="w-96" />
            <div className="mr-2">
                <BiSun onClick={() => setDarkMode(true)} size={28} className={`text-gray-700 cursor-pointer ${darkMode && 'hidden'}`} />
                <BsFillMoonFill onClick={() => setDarkMode(false)} size={28} className={`text-gray-500 cursor-pointer ${!darkMode && 'hidden'}`} />
            </div>
        </div>
        <HR />
    </div>
}

function LeftSidebar({ router, links }) {
    return <div className="flex flex-col justify-between h-screen p-4 border-r border-gray-200 dark:border-gray-700 w-80">
        <div>
            <div className="flex items-center h-14">
                <Logo />
            </div>
            <HR />
            <div>
                {links.map((props, i) => <LeftSidebarLink {...props} active={router.pathname === props.href} key={i} />)}
            </div>
        </div>
        <div>
            <HR />
            <div>
                <LogoutButton />
            </div>
        </div>
    </div>;
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

