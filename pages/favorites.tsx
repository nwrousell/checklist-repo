
import { useContext, } from "react";
import Head from "next/head";

import { FirebaseContext } from "../components/Layout";

import ChecklistLoader from "../components/ChecklistLoader";


export default function Favorites(){
    const { db, userDoc } = useContext(FirebaseContext)

    return (
        <>
            <Head>
                <title>Checklist Repo - Favorites</title>
            </Head>
            <ChecklistLoader db={db} userDoc={userDoc} state='favorites' />
        </>
    )
}