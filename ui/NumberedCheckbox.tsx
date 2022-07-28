import { useEffect, useState } from "react"

export default function NumberedCheckbox({ title, number, onComplete, subText = "", rightButton, disabled = false, large, lastItem, className = "", highlight, }) {
    const [completed, setCompleted] = useState(false)

    const handleClick = () => {
        onComplete(!completed)
        setCompleted(!completed)
    }

    return (
        <>
            <div className={`flex ${className}`}>
                <div>
                    <div
                        onClick={() => !disabled && handleClick()}
                        className={`${large ? 'w-10 h-10' : 'w-6 h-6'} rounded-full flex justify-center items-center transition-all p-0 m-0 cursor-pointer ${completed ? 'bg-primary-700' : `bg-white dark:bg-gray-800 border-2 ${highlight ? 'border-primary-700' : 'border-gray-300 dark:border-gray-600'}`}`}
                    >
                        <p className={`${large ? 'text-lg' : 'text-xs'} select-none transition-all font-semibold ${completed ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>{number}</p>
                    </div>
                    <div className={`${large ? 'w-10 h-8' : 'w-6 h-3'} flex justify-center`}>
                        <div className={`${large ? 'w-0.75' : 'w-0.5'} ${(completed && !lastItem) ? 'h-full' : 'hidden'} bg-primary-700`} />
                    </div>
                </div>
                <div className="flex justify-between w-full">
                    <div className={`w-full ${large ? 'mt-2' : 'mt-0.5'}  ml-2`}>
                        <label onClick={() => !disabled && handleClick()} className="font-medium text-gray-900 cursor-pointer select-none text-md dark:text-gray-300">{title}</label>
                        {subText && <HelperText text={subText} />}
                    </div>
                    <div>{ rightButton }</div>
                </div>
            </div>
        </>
    )
}

function HelperText({ text }) {
    return <p id="helper-checkbox-text" className="text-sm font-normal text-gray-500">{text}</p>
}