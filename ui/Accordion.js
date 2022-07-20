import { useState } from "react"
/*
    items: [
        { title, body },
        ..
    ]
*/
export default function Accordion({ items, className, onlyOneOpen=false, initialState=[] }) {
    const [activeItems, setActiveItems] = useState(initialState)

    const updateAccordion = (index) => {
        // Create copy of array (so React knows state updated)
        let temp = []
        for(let item of activeItems) temp.push(item)

        if(activeItems.includes(index)){
            // close that item
            let location = temp.indexOf(index)
            temp.splice(location, 1)
        }else{
            // open that item
            if(onlyOneOpen) temp = [index]
            else temp.push(index)
        }
        setActiveItems(temp)
    }

    return (
        <div className={className}>
            { items.map((item, i) => <AccordionItem index={i} key={i} onClick={updateAccordion} lastItem={i == items.length-1} {...item} hidden={!activeItems.includes(i)} />) }
        </div>

    )
}

function AccordionItem({ index, body, title, hidden, onClick, lastItem }) {
    return (
        <>
            <p>
                <button onClick={() => onClick(index)} type="button" className={`flex justify-between items-center p-4 w-full font-medium text-left border ${!lastItem && 'border-b-0'} border-gray-200 focus:ring-4 focus:ring-gray-200 text-lg dark:focus:ring-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-800 ${hidden ? 'text-gray-500' : 'text-gray-900 bg-gray-100'} dark:text-white`}>
                    <span className="">{ title }</span>
                    <svg className={`w-6 h-6 ${!hidden && 'rotate-180'} shrink-0`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </p>
            <div className={`${hidden && 'hidden'}`}>
                <div className={`p-4 border ${!lastItem && 'border-b-0'} border-gray-200 dark:border-gray-700 dark:bg-gray-900`}>
                    { body }
                </div>
            </div>
        </>
    )
}