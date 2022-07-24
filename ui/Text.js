

export default function Text({ small = false, children, className="", }) {
    return (
        <p className={`${small ? 'text-sm text-gray-500 font-md' : 'text-md text-gray-700 dark:text-gray-300'} ${className}`}>{children}</p>
    )
}

export function SuccessText({ small = false, children, className }) {
    return (
        <p className={`${small ? 'text-sm font-md' : 'text-md'} text-green-700 ${className}`}>{children}</p>
    )
}
export function WarningText({ small = false, children, className }) {
    return (
        <p className={`${small ? 'text-sm font-md' : 'text-md'} text-orange-700 ${className}`}>{children}</p>
    )
}
export function DangerText({ small = false, children, className }) {
    return (
        <p className={`${small ? 'text-sm font-md' : 'text-md'} text-red-700 ${className}`}>{children}</p>
    )
}
export function InfoText({ small = false, children, className }) {
    return (
        <p className={`${small ? 'text-sm font-md' : 'text-md'} text-blue-700 ${className}`}>{children}</p>
    )
}