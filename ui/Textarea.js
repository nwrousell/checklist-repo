import { DangerText } from "./Text"

export default function Textarea({ title, setValue, error="", initialValue="", placeholder=null, className="" }) {
    return (
        <div className={className}>
            <label htmlFor="message" className={`block mb-2 font-medium text-gray-900 text-md dark:text-gray-400 ${error && 'text-red-500 dark:text-red-500'}`}>{ title }</label>
            <textarea defaultValue={initialValue} onChange={(e) => setValue(e.target.value)} id="message" rows="4" className={`${error && 'border-red-500 border-2 text-red-500 dark:text-red-500'} block dark:border-none p-2.5 w-full text-sm text-gray-900 rounded border-2 outline-none border-gray-300 focus:ring-primary-700 focus:border-primary-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-700 dark:focus:border-primary-700`} placeholder={placeholder || `${title}...`}></textarea>
            <DangerText small>{ error }</DangerText>
        </div>
    )
}