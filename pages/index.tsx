import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import Checklist, { ChecklistItem } from '../components/Checklist'

import { query, limit, collection, getDocs, updateDoc, doc, arrayUnion, arrayRemove, increment, onSnapshot, where } from 'firebase/firestore'

import ChecklistCard from '../components/ChecklistCard'

import { FirebaseContext } from '../components/Layout'
import { useRouter } from 'next/router'
import Button from '../ui/Button'

const CHECKLISTS_TO_LOAD = 3

const Home: NextPage = () => {
    const { db, userDoc } = useContext(FirebaseContext)
    const [checklists, setChecklists] = useState<Checklist[]>([])
    const router = useRouter()
    const [checklistToLoad, setChecklistsToLoad] = useState(CHECKLISTS_TO_LOAD)

    useEffect(() => {
        const checklistsCollectionRef = collection(db, 'checklists')
        const q = query(checklistsCollectionRef, where('private', '==', false), limit(checklistToLoad))

        const unsub = onSnapshot(q, (querySnapshot) => {
            let temp: Checklist[] = []
            querySnapshot.forEach((doc) => {
                temp.push({ ...doc.data() as Checklist, docId: doc.id })
            })
            setChecklists(temp)
        })

        return () => unsub()
    }, [])

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

    return (
        <div className="relative grid h-full grid-cols-1 gap-4 p-4 md:p-8 lg:gap-8 md:grid-cols-2 lg:grid-cols-3 bg-gray-50 dark:bg-gray-700">
            {checklists.map((props: Checklist, i) => <ChecklistCard isPrivate={false} favorites={props.favorites} onFavorite={onFavorite} favoritedByUser={userDoc.favoritedChecklists.includes(props.docId)} {...props} key={i} />)}
            <Button title="Load more" onClick={() => setChecklistsToLoad(checklistToLoad+3)} className="absolute transform -translate-x-1/2 left-1/2 bottom-4" />
        </div>
    )
}



export default Home
