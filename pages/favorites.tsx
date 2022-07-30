
import { useContext, } from "react";



import { FirebaseContext } from "../components/Layout";

import ChecklistLoader from "../components/ChecklistLoader";


export default function Favorites(){
    const { db, userDoc } = useContext(FirebaseContext)

    return (
        <ChecklistLoader db={db} userDoc={userDoc} state='favorites' />
    )
}