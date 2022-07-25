import Text from './Text'

import { MdCheck, MdErrorOutline } from 'react-icons/md'

export default function Callout({ success=true, title, className="" }) {
    const iconSize = 48
    
    return (
        <div className={`rounded ${success ? 'bg-primary-100' : 'bg-red-100'} p-4 flex items-center justify-start ${className}`}>
            { success ? <MdCheck size={iconSize} className="mr-4 text-primary-700" /> : 
            <MdErrorOutline size={iconSize} className="mr-4 text-red-700" /> }
            <Text className={`font-bold ${success ? 'text-primary-700' : 'text-red-700'}`}>{ title }</Text>
        </div>
    )
}