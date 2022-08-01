import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../components/Layout'
import ChecklistLoader from '../components/ChecklistLoader'
import Head from 'next/head'

const Home: NextPage = () => {
    const { db, userDoc } = useContext(FirebaseContext)
    const [filterTag, setFilterTag] = useState('')

    useEffect(() => {
        if(window.location.href.split("?").length == 1) return

        const tag = window.location.href.split("=")[1].split("+")[0].replace('-', ' ')
        
        setFilterTag(tag)
    }, [])

    return (
        <>
            <Head>
                <title>Checklist Repo - Browse Checklists</title>
            </Head>
            <ChecklistLoader db={db} userDoc={userDoc} filterTag={filterTag} state={filterTag!=='' ? 'filter' : 'browse'} />
        </>
    )
}



export default Home
