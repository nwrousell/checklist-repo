// * https://flowbite.com/docs/components/badge/

export default function Badge({ colorClass=false, className="", title, onClick=null }){
    return (
        <span onClick={onClick} className={`${colorClass ? colorClass : 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-white'} text-sm  mr-2 px-2.5 py-0.5 rounded ${className}`}>
            { title }
        </span>
    )
}