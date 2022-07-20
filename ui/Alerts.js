// * https://flowbite.com/docs/components/alerts/
import { MdCheck, MdInfo } from "react-icons/md"

const marginClass = 'mb-2'

export function InfoAlert({ children, icon, onClick, className }) {
    return (
        <div onClick={onClick} className={`p-4 ${marginClass} text-md text-blue-700 bg-blue-100 ${onClick && 'hover:bg-blue-200 hover:dark:bg-blue-300'} rounded-lg dark:bg-blue-200 dark:text-blue-800 flex items-center ${className}`} role="alert">
            { icon || <span className="font-medium">Info!</span> }
            {children}
        </div>
    )
}

export function DangerAlert({ children, icon, onClick, className }) {
    return (
        <div onClick={onClick} className={`p-4 ${marginClass} text-md text-red-700 bg-red-100 ${onClick && 'hover:bg-red-200 hover:dark:bg-red-300'} rounded-lg dark:bg-red-200 dark:text-red-800 flex items-center ${className}`} role="alert">
            { icon || <span className="font-medium">Error!</span> }
            {children}
        </div>
    )
}

export function SuccessAlert({ children, icon, onClick, className }) {
    return (
        <div onClick={onClick} className={`p-4 ${marginClass} text-md text-green-700 bg-green-100 ${onClick && 'hover:bg-green-200 hover:dark:bg-green-300'} rounded-lg dark:bg-green-200 dark:text-green-800 flex items-center ${className}`} role="alert">
            { icon || <span className="font-medium">Success!</span> }
            {children}
        </div>
    )
}

export function WarningAlert({ children, icon, onClick, className }) {
    return (
        <div onClick={onClick} className={`p-4 ${marginClass} text-md text-yellow-700 bg-yellow-100 ${onClick && 'hover:bg-yellow-200 hover:dark:bg-yellow-300'} rounded-lg dark:bg-yellow-200 dark:text-yellow-800 flex items-center ${className}`} role="alert">
            { icon || <span className="font-medium">Warning!</span> }
            {children}
        </div>
    )
}

export function DarkAlert({ children, icon, onClick, className }) {
    return (
        <div onClick={onClick} className={`p-4 text-md ${marginClass} text-gray-700 bg-gray-100 ${onClick && 'hover:bg-gray-200 hover:dark:bg-gray-300'} rounded-lg dark:bg-gray-700 dark:text-gray-300 flex items-center ${className}`} role="alert">
            { icon || <span className="font-medium">Dark!</span> }
            {children}
        </div>
    )
}