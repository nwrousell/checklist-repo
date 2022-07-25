import Link from "next/link";
import { HiOutlineClipboardList } from 'react-icons/hi';

export function Logo() {
    return (
        <Link href="/">
            <div className="flex items-center cursor-pointer select-none">
                <HiOutlineClipboardList size={36} className="mr-2 text-primary-700 dark:text-primary-500" />
                <p className="font-mono text-xl font-semibold text-primary-700 dark:text-primary-500">Checklist Repo</p>
            </div>
        </Link>
    );
}
