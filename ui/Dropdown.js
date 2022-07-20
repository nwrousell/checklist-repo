import { useState } from "react"
// TODO - make the options disappear when the user clicks outside the box
export default function Dropdown({ options, chooseOption }) {
    const [optionsVisible, setOptionsVisible] = useState(false)

    return (
        <>
            <button id="dropdownDefault" onClick={() => setOptionsVisible(!optionsVisible)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
            <div id="dropdown" className={`z-10 ${!optionsVisible && 'hidden'} bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700`}>
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                    { options.map((title, i) => <Option title={title} onClick={() => chooseOption(title)} key={i} />) }
                </ul>
            </div>
        </>
    )
}

function Option({ title, onClick }) {
    return (
        <li onClick={onClick}>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{ title }</a>
        </li>
    )
}