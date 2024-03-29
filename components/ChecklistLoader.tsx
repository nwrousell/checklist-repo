import { useState, useEffect } from "react"
import InfiniteScroll from 'react-infinite-scroll-component'
import Checklist from "./Checklist"
import Heading from "../ui/Heading"
import ChecklistCard from "./ChecklistCard"
import Spinner from "../ui/Spinner"
import { QueryDocumentSnapshot, collection, orderBy, startAfter, where, query, getDocs, limit, updateDoc, arrayUnion, doc, increment, arrayRemove, Firestore, documentId } from "firebase/firestore"
import { useRouter } from "next/router"
import { User } from "../hooks/useUserDoc"
import Text from "../ui/Text"

const CHECKLISTS_TO_LOAD = 9

type LoadingState = 'browse' | 'user-created' | 'favorites' | 'filter'

export default function ChecklistLoader({ db, userDoc, state="browse", onDelete=null, filterTag='' }) {
    const [checklists, setChecklists] = useState([])
    const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot>()
    const [moreChecklists, setMoreChecklists] = useState(true)
    const router = useRouter()

    const onFavorite = (newValue: boolean, docId: string) => {
        if (!userDoc.exists) {
            router.push("/login")
            return
        }

        const userDocRef = doc(db, 'users', userDoc.uid)
        const checklistDocRef = doc(db, 'checklists', docId)

        switch (newValue) {
            case true:
                updateDoc(userDocRef, {
                    favoritedChecklists: arrayUnion(docId)
                })
                updateDoc(checklistDocRef, {
                    favorites: increment(1)
                })
                break
            case false:
                updateDoc(userDocRef, {
                    favoritedChecklists: arrayRemove(docId)
                })
                updateDoc(checklistDocRef, {
                    favorites: increment(-1)
                })
                break
        }
    }

    async function getNextBatch(first = false) {
        !first && console.log("get next")
        if(first) setLastVisible(null)
        if (!moreChecklists && !first) return
        if (!lastVisible && !first) return

        const checklistsCollectionRef = collection(db, 'checklists')

        // if(userDoc.exists && state=="browse") return

        let q
        switch(state){
            case 'filter':
                q = query(checklistsCollectionRef, where('private', '==', false), where('tags', 'array-contains', filterTag), orderBy("createdAt"), startAfter(first ? 0 : lastVisible), limit(CHECKLISTS_TO_LOAD))
                break;
            case 'browse':
                q = query(checklistsCollectionRef, where('private', '==', false), orderBy("createdAt"), startAfter(first ? 0 : lastVisible), limit(CHECKLISTS_TO_LOAD))
                break;
            case 'user-created':
                if (userDoc.createdChecklists.length === 0) return
                if(first) q = query(checklistsCollectionRef, orderBy(documentId()), where(documentId(), 'in', userDoc.createdChecklists), limit(CHECKLISTS_TO_LOAD))
                else q = query(checklistsCollectionRef, orderBy(documentId()), where(documentId(), 'in', userDoc.createdChecklists), startAfter(first ? 0 : lastVisible), limit(CHECKLISTS_TO_LOAD))
                break;
            case 'favorites':
                if (userDoc.favoritedChecklists.length === 0) return
                if(first) q = query(checklistsCollectionRef, orderBy(documentId()), where(documentId(), 'in', userDoc.createdChecklists), limit(CHECKLISTS_TO_LOAD))
                else q = query(checklistsCollectionRef, orderBy(documentId()), where(documentId(), 'in', userDoc.createdChecklists), startAfter(first ? 0 : lastVisible), limit(CHECKLISTS_TO_LOAD))
                break;
            }

        const documentSnapshots = await getDocs(q)

        const _lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]
        setLastVisible(_lastVisible)

        const temp = first ? [] : checklists
        documentSnapshots.docs.forEach((snapshot) => temp.push({ ...snapshot.data() as Checklist, docId: snapshot.id }))
        setChecklists(temp)

        if (documentSnapshots.docs.length < CHECKLISTS_TO_LOAD) setMoreChecklists(false)
        else setMoreChecklists(true)
    }

    useEffect(() => { getNextBatch(true) }, [state, userDoc])

    return (
        <div id="container-ref" className="relative min-h-full p-4 pb-32 overflow-scroll scrollbar-hide md:pb-32 md:p-8 bg-gray-50 dark:bg-gray-700">
            <InfiniteScroll
                dataLength={checklists.length}
                next={getNextBatch}
                hasMore={moreChecklists}
                loader={<div className="absolute transform -translate-x-1/2 bottom-8 left-1/2"><Spinner /></div>}
                // scrollableTarget={"container-ref"}
                endMessage={
                    <Text small className="absolute text-center transform -translate-x-1/2 select-none bottom-8 left-1/2">Those are all of the checklists we have for that query.</Text>
                }
                className="grid h-full grid-cols-1 gap-4 lg:gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
                {checklists.map((props: Checklist, i) => <ChecklistCard onDelete={onDelete} canEdit={state==='user-created'} isPrivate={props.private} favorites={props.favorites} onFavorite={onFavorite} favoritedByUser={userDoc.favoritedChecklists.includes(props.docId)} {...props} key={i} />)}
                {(checklists.length === 0 && state==='user-created') && <Text className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">You haven't created any checklists yet. <span className="underline cursor-pointer hover:no-underline" onClick={() => router.push("/create-checklist")}>Create your first.</span></Text>}
                {(checklists.length === 0 && state==='favorites') && <Text className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">You haven't favorited any checklists yet. <span className="underline cursor-pointer hover:no-underline" onClick={() => router.push("/")}>Browse.</span></Text>}
            </InfiniteScroll>
        </div>
    )
}