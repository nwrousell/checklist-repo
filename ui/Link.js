export default function Link({ children, href, className }){
    return <a href={href} className={`font-semibold text-blue-600 ${className}`}>{ children }</a>
}