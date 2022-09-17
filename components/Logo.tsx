import Link from "next/link";
import { HiOutlineClipboardList } from 'react-icons/hi';

export function Logo() {
    return (
        <Link href="/">
            <div className="flex items-center cursor-pointer select-none">
                <HiOutlineClipboardList size={36} className="mr-2 text-primary-700 dark:text-primary-500" />
                <div>
                    <p className="mb-0 font-mono text-xl font-semibold text-primary-700 dark:text-primary-500">Checklist Repo</p>
                    <p className="-mt-1 font-mono text-xs italic font-semibold text-gray-500 dark:opacity-100 dark:text-primary-700">Checklists for Creatives</p>
                </div>
            </div>
        </Link>
    );
}
