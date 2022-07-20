export default function TextInput({ title, inputRef=null, placeholder=null, error=false, setValue, required=false, className="", password=false }){
    const labelClasses = !error ? 'block mb-2 text-md font-medium text-gray-900 dark:text-gray-300' : 'block mb-2 text-sm font-medium text-red-700 dark:text-red-500'
    const inputClasses = !error ? 'border-2 border-gray-300 text-gray-900 text-md rounded focus:ring-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none dark:focus:ring-primary-700 dark:focus:border-primary-700' : 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
    
    return (
        <div className={className}>
            <label htmlFor="first_name" className={labelClasses}>{ title }</label>
            <input ref={inputRef} onChange={(e) => setValue(e.target.value)} type={password ? 'password' : 'text'} id="first_name" className={`${inputClasses} min-w-max`} placeholder={placeholder || `${title}...`} required={required} />
        </div>
    )
}