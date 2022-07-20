// * https://flowbite.com/docs/components/badge/

export default function Badge({ colorClass=false, className, title, onClick=null }){
    return (
        <span onClick={onClick} className={`${colorClass ? colorClass : 'bg-primary-100 text-primary-800 dark:bg-primary-200 dark:text-primary-800'} text-sm font-semibold mr-2 px-2.5 py-0.5 rounded ${className}`}>
            { title }
        </span>
    )
}