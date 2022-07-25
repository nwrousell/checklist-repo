import HR from '../ui/HR';
import { BsFillMoonFill } from 'react-icons/bs';
import { BiSun } from 'react-icons/bi';
import { Search } from "./Search";

export function TopBar(setDarkMode, darkMode: boolean) {
    return <div className="px-8 py-4">
        <div className="flex items-center justify-between h-14">
            <Search className="w-96" />
            <div className="mr-2">
                <BiSun onClick={() => setDarkMode(true)} size={28} className={`text-gray-700 cursor-pointer ${darkMode && 'hidden'}`} />
                <BsFillMoonFill onClick={() => setDarkMode(false)} size={28} className={`text-gray-500 cursor-pointer ${!darkMode && 'hidden'}`} />
            </div>
        </div>
        <HR />
    </div>;
}
