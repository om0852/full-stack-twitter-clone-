"use client"
import { useCallback, useEffect, useState } from "react";
import useregisterModal from "../hooks/userRegisterModal"
import Input from "../Input";
import Modal from "../Modal";
import axios from "axios";
import useLoginModal from "../hooks/UserLoginModal";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
    const registerModal = useregisterModal();
    const loginModal = useLoginModal();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [username, setUserName] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = () => {
        if (isLoading) {
            return;
        }
        registerModal.onClose()
        loginModal.onOpen()
    }
useEffect(()=>{
// console.log(email)
},[email])
    const onSubmit = async () => {
        try {
            setIsLoading(true);
alert("run")
            //todo  ado log in
            await axios.post(`/api/register`,
                { email:email, password:password, username:username, name:name }
            );
            toast.success("account created")
            signIn("credentials",{
                email:email, password:password
            })
            registerModal.onClose();
        }
        catch (error) {
            // console.log(error);
            toast.success("Something went wrong")

        }
        finally {
            setIsLoading(false);
        }
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} disabled={isLoading} />
            <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} disabled={isLoading} />
            <Input placeholder="Username" onChange={(e) => setUserName(e.target.value)} value={username} disabled={isLoading} />
            <Input placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} disabled={isLoading} />

        </div>
    )
    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>Already have an account?</p>
            <span onClick={onToggle} className="text-white cursor-pointer hover:underline">Sign In</span>

        </div>
    )
    return (
        <>
            <Modal
                disabled={isLoading}
                isOpen={registerModal.isOpen}
                title="Create an account "
                actionLabel="Sign Up"
                onClose={registerModal.onClose}
                onSubmit={onSubmit}
                body={bodyContent}
                footer={footerContent} />
        </>
    )
}

export default RegisterModal