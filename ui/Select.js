/*
    options: [
        { title, value }
    ]
*/
export default function Select({ options, title, className, setValue }) {
    return (
        <div>
            <label htmlFor={'select'} className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{ title }</label>
            <select onChange={(e) => setValue(e.target.value)} id="select" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value={-1}>{ title }</option>
                { options.map(({title, value}, i) => <option key={i} value={value}>{ title }</option>) }
            </select>
        </div>
    )
}