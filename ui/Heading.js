
export default function Heading({ children, className="", }) {
    return (
        <p className={`text-2xl font-bold mb-2 text-gray-900 ${className}`}>{ children }</p>
    )
  }