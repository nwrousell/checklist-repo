export default function Overlay({ onClick }){
    return <div onClick={onClick} className="fixed inset-0 bg-black opacity-40 z-20" />
}