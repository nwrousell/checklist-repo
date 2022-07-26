import { useReducer, } from 'react'
import NumberedCheckbox from "../ui/NumberedCheckbox"

function reducer(state: boolean[], action){
    return [ ...state.slice(0, action.index), action.value, ...state.slice(action.index+1) ]
}

interface Checklist {
    title: string;
    description: string;
    author: string;
    private: boolean;
    tags: string[];
    items: ChecklistItem[];
    hearts: Number;
}

export interface ChecklistItem {
    title: string;
    subText?: string;
    [key: string]: any;
}


function Checklist({ items, large = false, disabled = false, cutOff=999 }) {
    const [itemsStatus, dispatch] = useReducer(reducer, createArrayOfFalses(items.length))

    const generateChecklist = () => {
        items.slice(0, cutOff)

        let lastChecked = true
        return items.map((props: ChecklistItem, i: number) => {
            let highlight = (lastChecked && !itemsStatus[i])
            if(itemsStatus[i]) lastChecked = true
            else lastChecked = false
            return <NumberedCheckbox highlight={!disabled && highlight} {...props} lastItem={i+1==items.length} onComplete={(value) => dispatch({ index: i, value })} key={i} number={i+1} large={large} disabled={disabled} />
        })
    }

    return (
        <div>
            { generateChecklist() }
        </div>
    )
}

function createArrayOfFalses(length: number): boolean[] {
    let array = []
    for (let i = 0; i < length; i++) array.push(false)
    return array
}

export default Checklist
