import HR from '../ui/HR';
import { BsFillMoonFill } from 'react-icons/bs';
import { BiSun } from 'react-icons/bi';
import { Search } from "./Search";
import Avatar from './Avatar';

export function TopBar({setDarkMode, darkMode, displayName, photoURL, className=""}) {
    return <div className={`px-8 pt-4 ${className}`}>
        <div className="flex items-center justify-between h-14">
            <Search className="w-96" />
            <div className="flex items-center">
                { (displayName || photoURL) && <Avatar photoURL={photoURL} displayName={displayName} className="mr-4" /> }
                <div className="mr-2">
                    <BiSun onClick={() => setDarkMode(true)} size={28} className={`text-gray-700 cursor-pointer ${darkMode && 'hidden'}`} />
                    <BsFillMoonFill onClick={() => setDarkMode(false)} size={28} className={`text-gray-500 cursor-pointer ${!darkMode && 'hidden'}`} />
                </div>
            </div>
        </div>
        <HR />
    </div>;
}
