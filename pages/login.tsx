import Heading from "../ui/Heading";
import Text from "../ui/Text";
import Image from "next/image";
import GoogleButton from '../ui/GoogleButton'
import HR from "../ui/HR";
import TextInput from "../ui/TextInput";


import { useContext, useEffect, useState } from "react";
import Button from "../ui/Button";

import { FirebaseContext } from "../components/Layout";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from "next/router";
import { DangerAlert } from '../ui/Alerts'

const provider = new GoogleAuthProvider()

export default function Login() {
    const { auth } = useContext(FirebaseContext)
    const [user, loading, error] = useAuthState(auth)
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signingUp, setSigningUp] = useState(false)

    const [loginError, setLoginError] = useState('')

    const onAction = () => {
        switch (signingUp) {
            case true:
                createUserWithEmailAndPassword(auth, email, password)
                    .catch(err => setLoginError(translateAuthError(err)))
                break
            case false:
                signInWithEmailAndPassword(auth, email, password)
                    .catch(err => setLoginError(translateAuthError(err)))
                break
        }
    }

    useEffect(() => {
        if (user) router.push("/")
    }, [user])

    // https://dribbble.com/shots/17367018-Saas-Log-in-page
    return (
        <div className="flex items-center justify-center h-screen md:bg-gray-100 md:dark:bg-gray-700">
            <div className="p-4 bg-white rounded dark:bg-gray-800 w-96">
                <Heading>{signingUp ? 'Sign up' : 'Log in'}</Heading>
                <Text small className="mb-4">Enter your credentials to access your account.</Text>
                <GoogleButton onClick={() => signInWithPopup(auth, provider)} />
                <div className="flex items-center my-4">
                    <HR light />
                    <Text small className="px-2 mb-1">or</Text>
                    <HR light />
                </div>
                <TextInput placeholder="bobbyjohn123@gmail.com" title="Email" setValue={setEmail} className="mb-2" />
                <TextInput title="Password" setValue={setPassword} password />
                <Button title={signingUp ? 'Sign up' : 'Log in'} className="w-full my-4" onClick={onAction} />

                {
                    signingUp ?
                        <Text className="select-none">Already have an account? <span onClick={() => setSigningUp(false)} className="cursor-pointer text-primary-700 hover:text-gray-700 dark:hover:text-white">Log in</span></Text>
                        :
                        <Text className="select-none">Don't have an account? <span onClick={() => setSigningUp(true)} className="cursor-pointer text-primary-700 hover:text-gray-700 dark:hover:text-white">Sign up</span></Text>
                }

                {loginError !== '' && <DangerAlert className="mt-4">{loginError}</DangerAlert>}
            </div>
        </div>
    )
}

function translateAuthError({ code }: { code: string }) {
    return code.substring(5).replace("-", " ")
}