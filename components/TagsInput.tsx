import TextInput from "../ui/TextInput";
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import Text from "../ui/Text";
import { useState } from "react";


export default function TagsInput({ onTagsUpdate }){
    const [newTagTitle, setNewTagTitle] = useState(false)
    const [tags, setTags] = useState([])

    const addTag = () => {
        const temp = []
        for(let tag of tags) temp.push(tag)

        temp.push(newTagTitle)
        setTags(temp)
        onTagsUpdate(temp)
    }

    return (
        <>
            <TextInput title="Add tag" setValue={setNewTagTitle} className="mb-2" />
            <Button title={'Add'} onClick={addTag} className="mb-2" />
            <div className="flex p-2">
                <Text className="mr-2"><strong>Tags: </strong></Text>
                { tags.map((title, i) => <Badge title={title} key={i} className="mr-2" />) }
            </div>
        </>
    )
}
