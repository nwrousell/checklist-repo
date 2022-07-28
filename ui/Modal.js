import Overlay from "./Overlay"
import Button from "./Button"

export default function Modal({ close, content, actionTitle, danger=false, action }){
    return (
        <>
            <Overlay />
            <div className="fixed z-50 p-4 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg left-1/2 top-1/2 dark:bg-gray-800">
                { content }
                <hr className="my-4" />
                <div className="flex justify-end">
                    <Button color="light" title="Close" onClick={close} className="mr-2" />
                    {(action && actionTitle) && <Button color={danger ? 'red' : 'primary'} title={actionTitle} onClick={action} />}
                </div>
            </div>
        </>
    )
}