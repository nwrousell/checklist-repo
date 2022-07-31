import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";

export default function useTags(db){
    const [tagDocData, loading, error, snapshot] = useDocumentData(doc(db, 'misc', 'tags'));

    const tags_list = loading ? [] : transformTagList(tagDocData.tags)

    return tags_list
}

export function transformTagList(tags){
    const temp = []
    for(let tag of tags) temp.push({ value: tag, label: tag })
    return temp
}