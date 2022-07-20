export default function LinkButton({ children, onClick, className }){
    return <p onClick={onClick} className={`font-semibold text-blue-600 ${className}`}>{ children }</p>
}