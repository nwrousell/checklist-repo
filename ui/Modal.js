import Overlay from "./Overlay"
import Button from "./Button"

export default function Modal({ close, content, actionTitle, action }){
    return (
        <>
            <Overlay />
            <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 z-50">
                { content }
                <hr className="my-4" />
                <div className="flex justify-end">
                    <Button color="light" title="Close" onClick={close} className="mr-2" />
                    {(action && actionTitle) && <Button title={actionTitle} onClick={action} />}
                </div>
            </div>
        </>
    )
}