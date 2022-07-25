import Link from 'next/link';

export function LeftSidebarLink({ title, Icon, active, href }) {
    return <Link href={href}>
        <div className={`flex items-center p-2 mb-2 rounded cursor-pointer select-none ${active ? 'bg-primary-100 dark:bg-primary-800' : 'group hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
            <Icon size={24} className={`mr-2 ${active ? 'text-primary-700 dark:text-primary-500' : 'text-gray-300 dark:text-gray-500 group-hover:text-gray-400 dark:group-hover:text-gray-400'}`} />
            <p className={`text-lg font-medium ${active ? 'text-primary-700 dark:text-primary-500' : 'text-gray-300 dark:text-gray-500 group-hover:text-gray-400 dark:group-hover:text-gray-400'}`}>{title}</p>
        </div>
    </Link>;
}
