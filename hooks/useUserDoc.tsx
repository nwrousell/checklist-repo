import { doc, onSnapshot, setDoc, DocumentReference } from "firebase/firestore"
import { useState, useEffect } from "react"

export interface User {
    uid?: string;
    name: string;
    favoritedChecklists: string[];
    createdChecklists: string[];
    itemsCompleted: number;
    checklistCompletions: number;
    exists?: boolean;
}

const blankUserDoc: User = {
    uid: '',
    name: '',
    createdChecklists: [],
    favoritedChecklists: [],
    itemsCompleted: 0,
    checklistCompletions: 0,
    exists: false,
}

export default function useUserDoc(user, db){
    const [userDoc, setUserDoc] = useState(blankUserDoc)

    useEffect(() => {
        if(!user) {
            setUserDoc(blankUserDoc)
            return
        }

        const userDocRef = doc(db, "users", user.uid)
        const unsub = onSnapshot(userDocRef, (doc) => {
            if(doc.exists()) setUserDoc({...doc.data() as User, uid: user.uid, exists: true})
            else createUserDoc(userDocRef)
        })

        return () => unsub()
    }, [user])

    return userDoc
}

function createUserDoc(userDocRef){
    const userDoc: User = {
        favoritedChecklists: [],
        createdChecklists: [],
        name: '',
        itemsCompleted: 0,
        checklistCompletions: 0,
    }
    setDoc(userDocRef, userDoc)
}