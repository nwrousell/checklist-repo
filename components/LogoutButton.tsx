import { HiOutlineLogout } from 'react-icons/hi';
import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { FirebaseContext } from './Layout';

export function LogoutButton() {
    const { auth } = useContext(FirebaseContext)

    return (
        <div onClick={() => signOut(auth)} className={`flex items-center p-2 mb-2 rounded cursor-pointer select-none group hover:bg-gray-100 dark:hover:bg-gray-700`}>
            <HiOutlineLogout size={24} className={`mr-2 text-gray-300 dark:text-gray-500 group-hover:text-gray-400 dark:group-hover:text-gray-400`} />
            <p className={`text-lg font-medium text-gray-300 dark:text-gray-500 group-hover:text-gray-400 dark:group-hover:text-gray-400`}>Log out</p>
        </div>
    );
}
