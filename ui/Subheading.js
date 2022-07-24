
export default function Subheading({ children, className="", }) {
    return (
        <p className={`text-xl font-bold text-gray-900 dark:text-gray-200 ${className}`}>{ children }</p>
    )
  }