export default function HR({ light=false }) {
    return <hr className={`w-full h-0.5 my-4 ${light ? 'bg-gray-100' : 'bg-gray-200'} border-none rounded-sm`} />
}