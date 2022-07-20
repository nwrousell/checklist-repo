import { useState } from "react"

/*
    buttons: [
        title, ...
    ]
*/
export default function ButtonGroup({ buttons, onClick, staySelected, className }) {
    const [selectedButton, setSelectedButton] = useState(false)

    const handleClick = (index) => {
        onClick(buttons[index])
        if(!staySelected) return

        setSelectedButton(index)
    }

    return (
        <div className={`inline-flex rounded-md shadow-sm ${className}`} role="group">
            { buttons.map((title, i) => <ButtonItem key={i} title={title} isFirst={i==0} isLast={i==buttons.length-1} onClick={() => handleClick(i)} selected={i==selectedButton} />) }
        </div>
    )
}

function ButtonItem({ title, isFirst, isLast, onClick, selected }){
    return (
        <button onClick={onClick} type="button" 
            className={`${isFirst && 'border-l rounded-l-md'} ${isLast && 'rounded-r-md'} py-2 px-4 text-sm font-medium ${selected ? 'bg-blue-700 text-white' : 'text-gray-900 bg-white border-r border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700'}`}
        >
                { title }
        </button>
    )
}