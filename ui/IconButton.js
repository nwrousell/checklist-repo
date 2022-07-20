
export default function IconButton({ icon, outlineOnly=false, onClick, className }) {
    if (outlineOnly) {
        return (
            <button type="button" onClick={onClick} className={`text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-4 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 ${className}`}>
                { icon }
            </button>
        )
    }else{
        return (
            <button type="button" onClick={onClick} className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-4 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${className}`}>
                { icon }
            </button>
        )
    }
}