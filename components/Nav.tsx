import Search from '../ui/Search'

import { BsThreeDots, BsFillMoonFill } from 'react-icons/bs'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const LINKS = [
    {title: 'Sign In', destination: '#'},
    {title: 'Create Checklist', destination: '/create-checklist'},
    {title: 'About', destination: '#'},
]

export default function Nav({ setDarkMode, darkMode }: { setDarkMode: (state: boolean) => void, darkMode: boolean }) {
    const [dropdownVisible, setDropdownVisible] = useState(false)

    return (
        <div className="flex items-center justify-between px-8 py-4 border-b">
            <div className="flex">
                <Logo className="mr-4" />
                {/* <Search /> */}
            </div>
            <div className="flex items-center">
                <BsFillMoonFill size={22} onClick={() => setDarkMode(!darkMode)} className="mr-4 text-gray-700 cursor-pointer dark:text-gray-500" />
                <div className="relative">
                    <BsThreeDots size={28} onClick={() => setDropdownVisible(!dropdownVisible)} className="text-gray-700 cursor-pointer dark:text-gray-500" />
                    <DropdownMenu visible={dropdownVisible} />
                </div>
            </div>
        </div>
    )
}

function Logo({ className = "" }) {
    return (
        <p className={`select-none text-2xl font-bold text-primary-700 ${className}`}>Checklist Repo</p>
    )
}
function DropdownMenu({ visible }: { visible: boolean }) {
    return (
        <div className={`${!visible && 'hidden'} w-36 absolute right-0 z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`} id="dropdown">
            <ul className="py-1" aria-labelledby="dropdown">
                { LINKS.map(({ title, destination }, i) => <DropdownMenuLink destination={destination} title={title} key={i} />)  }
            </ul>
        </div>
    )
}
function DropdownMenuLink({ title, destination }: {title: string, destination: string}) {
    return (
        <li>
            <Link href={destination}><a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">{ title }</a></Link>
        </li>
    )
}