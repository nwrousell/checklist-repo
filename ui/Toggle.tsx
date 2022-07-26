import { useEffect, useState } from "react"

export default function Toggle({ title, setValue, className="" }) {
    const [on, setOn] = useState(false)

    useEffect(() => setValue(on), [on])

    return (
        <label htmlFor="default-toggle" className={`inline-flex relative items-center cursor-pointer ${className}`}>
                <div 
                    onClick={() => setOn(!on)}
                    className={`w-11 h-6 bg-gray-200 rounded-full after:content-[''] after:absolute after:top-[2px] 
                    after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                  dark:border-gray-600 focus:ring-4 focus:ring-blue-300 dark:focus:ring-primary-800 
                        dark:bg-gray-700 ${on && 'after:translate-x-full after:border-white bg-primary-600'}`} 
                />
                <span onClick={() => setOn(!on)} className="ml-3 text-sm font-medium text-gray-900 select-none dark:text-gray-300">{ title }</span>
        </label>
    )
}