import Text from "../ui/Text"

export default function Avatar({ photoURL="", displayName="", className="" }){
    return (
        <div className={`flex items-center ${className}`}>
            { photoURL && <img src={photoURL} className={`w-8 h-8 ${displayName && 'mr-2'} rounded-full select-none`} />}
            { displayName && <Text className="select-none">{ displayName }</Text>}
        </div>
    )
}