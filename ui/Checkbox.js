import { useState } from 'react'

export default function Checkbox({ title, subText="", large, onChange=false, disabled=false, className="" }) {
    const [checked, setChecked] = useState(false)

    return (
        <div className={`flex ${className}`}>
            <div onClick={() => !disabled && setChecked(!checked)} className={`${large ? 'w-10 h-10' : 'w-6 h-6'} transition-all p-0 m-0 rounded-lg cursor-pointer ${checked ? 'bg-primary-700' : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500'}`} />
            <div className="w-full mt-1 ml-2">
                <div className="flex items-center justify-between">
                    <label onClick={() => !disabled && setChecked(!checked)} className="font-medium text-gray-900 cursor-pointer text-md dark:text-gray-300">{ title }</label>
                </div>
                { subText && <HelperText text={subText} /> }
            </div>
        </div>
    )
}

function HelperText({ text }) {
    return <p id="helper-checkbox-text" className="text-sm font-normal text-gray-500 dark:text-gray-300">{ text }</p>
}