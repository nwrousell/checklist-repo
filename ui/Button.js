// * https://flowbite.com/docs/components/buttons/

export default function Button({ title, stretch=false, disabled=false, small=false, color="primary", onClick, className="", }) {
    let colorClasses
    if(color=='primary') colorClasses = 'text-white bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
    if(color=='red') colorClasses = 'text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
    if(color=='light') colorClasses = 'text-gray-900 bg-white border hover:bg-gray-100 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'

    let sizeClasses
    if(small) sizeClasses = 'rounded text-sm px-2.5 py-1.5'
    else sizeClasses = 'rounded text-md px-5 py-2.5 mb-2'

    return (
        <button 
            type="button" 
            onClick={() => !disabled && onClick()}
            className={`select-none font-medium ${sizeClasses} focus:outline-none ${disabled ? 'bg-gray-200 text-gray-500 dark:bg-gray-600 dark:text-gray-400 cursor-not-allowed focus:ring-0' : colorClasses} focus:ring-4 ${stretch && 'w-full'} ${className}`}>{title}</button>
    )
  }