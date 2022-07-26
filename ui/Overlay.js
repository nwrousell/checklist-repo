export default function Overlay({ onClick=null, light=false }){
    return <div onClick={onClick} className={`fixed inset-0 z-20 ${light ? 'bg-gray-800 dark:bg-gray-200 opacity-20' : 'bg-black dark:bg-white opacity-40'}`} />
}