import { DangerText } from "./Text"

export default function TextInput({ title, onBlur=null, initialValue="", inputRef=null, placeholder=null, error="", setValue, required=false, className="", password=false }){
    const labelClasses = !error ? 'block mb-2 text-md font-medium text-gray-900 dark:text-gray-300' : 'block mb-2 text-md font-medium text-red-700 dark:text-red-500'
    const inputClasses = !error ? 'border-2 border-gray-300 text-gray-900 text-md rounded focus:ring-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-none dark:placeholder-gray-400 dark:text-white outline-none dark:focus:ring-primary-700 dark:focus:border-primary-700' : 'bg-red-50 outline-none border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
    
    return (
        <div className={className}>
            <label htmlFor={`text-${title.replaceAll(" ", "-")}`} className={labelClasses}>{ title }</label>
            <input onBlur={(e) => onBlur && onBlur(e.target.value)} ref={inputRef} defaultValue={initialValue} onChange={(e) => setValue(e.target.value)} type={password ? 'password' : 'text'} id={`text-${title.replaceAll(" ", "-")}`} className={`${inputClasses}`} placeholder={placeholder || `${title}...`} required={required} />
            <DangerText small>{ error }</DangerText>
        </div>
    )
}