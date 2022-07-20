import Text from "./Text"

export default function Checkbox({ title, onClick=null, subText, onChang=null, className, disabled }) {
    return (
        <div className={`flex ${className}`} onClick={onClick}>
            <div className="flex flex-row items-center h-6">
                <input disabled={disabled} onChange={(e) => onChange(e.target.checked)} id={`checkbox-${title.replaceAll(" ", "-")}`} type="checkbox" value="" 
                    className="w-6 h-6 bg-gray-100 border-gray-300 rounded-lg cursor-pointer dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div className="w-full ml-2">
                <div className="flex items-center justify-between">
                    <label htmlFor={`checkbox-${title.replaceAll(" ", "-")}`} className="font-medium text-gray-900 text-md dark:text-gray-300">{ title }</label>
                </div>
                { subText && <HelperText text={subText} /> }
            </div>
        </div>
    )
}

function HelperText({ text }) {
    return <p id="helper-checkbox-text" className="text-sm font-normal text-gray-500 dark:text-gray-300">{ text }</p>
}