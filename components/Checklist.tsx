import { DocumentReference } from 'firebase/firestore';
import { useReducer, } from 'react'
import NumberedCheckbox from "../ui/NumberedCheckbox"

interface Checklist {
    title: string;
    description: string;
    author: string;
    private: boolean;
    tags: string[];
    items: ChecklistItem[];
    favorites?: Number;
    docId?: string;
}

export interface ChecklistItem {
    title: string;
    subText?: string;
    [key: string]: any;
}

function reducer(state: boolean[], action){
    return [ ...state.slice(0, action.index), action.value, ...state.slice(action.index+1) ]
}

function Checklist({ items, large = false, disabled = false, onItemCompleted=null, onChecklistCompleted=null, cutOff=999 }) {
    const [itemsStatus, dispatch] = useReducer(reducer, createArrayOfFalses(items.length))

    const onComplete = (value, i) => {
        const num = value ? 1 : -1
        onItemCompleted && onItemCompleted(num)

        const completedChecklist = (value && countInstancesInArray(false, itemsStatus)==1)
        if(completedChecklist && onChecklistCompleted) onChecklistCompleted(1)

        const uncompletedChecklist = (countInstancesInArray(false, itemsStatus)==0 && !value)
        if(uncompletedChecklist && onChecklistCompleted) onChecklistCompleted(-1)

        // this after because there's a slight delay so it can't be relied upon to update itemsStatus fast enough
        dispatch({ index: i, value })
    }

    const generateChecklist = () => {
        items.slice(0, cutOff)

        let lastChecked = true
        return items.map((props: ChecklistItem, i: number) => {
            let highlight = (lastChecked && !itemsStatus[i])
            if(itemsStatus[i]) lastChecked = true
            else lastChecked = false
            return <NumberedCheckbox highlight={!disabled && highlight} {...props} lastItem={i+1==items.length} onComplete={(value) => onComplete(value, i)} key={i} number={i+1} large={large} disabled={disabled} />
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
function countInstancesInArray(value: any, array: any[]){
    let count = 0
    for(const val of array) val === value && count++
    return count
}

export default Checklist
