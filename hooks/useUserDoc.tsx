import { doc, onSnapshot, setDoc, DocumentReference } from "firebase/firestore"
import { useState, useEffect } from "react"

export interface User {
    uid?: string;
    name: string;
    favoritedChecklists: string[];
    createdChecklists: string[];
    [key: string]: any;
}

const blankUserDoc: User = {
    uid: '',
    name: '',
    createdChecklists: [],
    favoritedChecklists: [],
}

export default function useUserDoc(user, db){
    const [userDoc, setUserDoc] = useState(blankUserDoc)

    useEffect(() => {
        if(!user) return

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
    }
    setDoc(userDocRef, userDoc)
}