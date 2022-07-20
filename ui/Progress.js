// * https://flowbite.com/docs/components/progress/

export default function Progress({ percent, className }) {
    return (
        <div className={`w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 ${className}`}>
            <div className="bg-blue-600 h-2.5 rounded-full transition-all" style={{width: `${percent}%`}}></div>
        </div>
    )
}