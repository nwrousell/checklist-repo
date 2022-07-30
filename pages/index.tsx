import type { NextPage } from 'next'
import { useContext, } from 'react'



import { FirebaseContext } from '../components/Layout'
import ChecklistLoader from '../components/ChecklistLoader'

const Home: NextPage = () => {
    const { db, userDoc } = useContext(FirebaseContext)

    return (
        <ChecklistLoader db={db} userDoc={userDoc} state='browse' />
    )
}



export default Home
