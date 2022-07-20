import Heading from "../ui/Heading";
import Text from "../ui/Text";
import Image from "next/image";
import GoogleButton from '../ui/GoogleButton'
import HR from "../ui/HR";
import TextInput from "../ui/TextInput";

import { useState } from "react";
import Button from "../ui/Button";
// https://dribbble.com/shots/17367018-Saas-Log-in-page

export default function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signingUp, setSigningUp] = useState(false)

    const onAction = () => {

    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-4 bg-white rounded w-96">
                <Heading>{signingUp ? 'Sign up' : 'Log in'}</Heading>
                <Text small className="mb-4">Enter your credentials to access your account.</Text>
                <GoogleButton onClick={() => console.log("sign in with google")} />
                <div className="flex items-center my-4">
                    <HR light />
                    <Text small className="px-2 mb-1">or</Text>
                    <HR light />
                </div>
                <TextInput placeholder="bobbyjohn123@gmail.com" title="Email" setValue={setEmail} className="mb-2" />
                <TextInput title="Password" setValue={setPassword} password />
                <Button title={signingUp ? 'Sign up' : 'Log in'} className="w-full mt-4 mb-8" onClick={onAction} />
                
                {
                    signingUp ?
                        <Text className="select-none">Already have an account? <span onClick={() => setSigningUp(false)} className="cursor-pointer text-primary-700 hover:text-gray-700">Log in</span></Text>
                    :
                        <Text className="select-none">Don't have an account? <span onClick={() => setSigningUp(true)} className="cursor-pointer text-primary-700 hover:text-gray-700">Sign up</span></Text>
                }
            </div>
        </div>
    )
}
