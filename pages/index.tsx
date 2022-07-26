import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import Checklist, { ChecklistItem } from '../components/Checklist'

import { query, limit, collection, getDocs, updateDoc, doc, arrayUnion, arrayRemove, increment, onSnapshot } from 'firebase/firestore'

import ChecklistCard from '../components/ChecklistCard'

import { FirebaseContext } from '../components/Layout'

const CHECKLISTS_TO_LOAD = 3

const Home: NextPage = () => {
    const { db, userDoc } = useContext(FirebaseContext)
    const [checklists, setChecklists] = useState<Checklist[]>([])

    useEffect(() => {
            const checklistsCollectionRef = collection(db, 'checklists')
            const q = query(checklistsCollectionRef, limit(CHECKLISTS_TO_LOAD))

            const unsub = onSnapshot(q, (querySnapshot) => {
                let temp: Checklist[] = []
                querySnapshot.forEach((doc) => {
                    temp.push({...doc.data() as Checklist, docId: doc.id })
                })
                setChecklists(temp)
            })
            
            return () => unsub()
    }, [])

    const onFavorite = (newValue: boolean, docId: string) => {
        const userDocRef = doc(db, 'users', userDoc.uid)
        const checklistDocRef = doc(db, 'checklists', docId)

        switch(newValue){
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
        <div className="grid h-full grid-cols-1 gap-4 p-4 md:p-8 lg:gap-8 md:grid-cols-2 lg:grid-cols-3 bg-gray-50 dark:bg-gray-700">
            { checklists.map((props: Checklist, i) => <ChecklistCard onFavorite={onFavorite} favoritedByUser={userDoc.favoritedChecklists.includes(props.docId)} {...props} key={i} />) }
        </div>
    )
}



export default Home
