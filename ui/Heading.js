
export default function Heading({ children, big=false, className="", }) {
    return (
        <p className={`${big ? 'text-5xl' : 'text-2xl'} font-bold mb-2 text-gray-900 dark:text-gray-200 ${className}`}>{ children }</p>
    )
  }