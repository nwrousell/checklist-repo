import { AiOutlineMenu } from 'react-icons/ai';
import { BsFillMoonFill } from 'react-icons/bs';
import { BiSun } from 'react-icons/bi';
import { Logo } from "./Logo";

export function MobileTopBar({ setDarkMode, darkMode, setNavOut, navOut }) {
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
