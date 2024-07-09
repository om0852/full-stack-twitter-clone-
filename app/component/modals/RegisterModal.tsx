"use client"
import { useCallback, useState } from "react";
import useregisterModal from "../hooks/userRegisterModal"
import Input from "../Input";
import { Modak } from "next/font/google";
import Modal from "../Modal";
import useRegisterModal from "../hooks/userRegisterModal";
import useLoginModal from "../hooks/UserLoginModal";

const RegisterModal=()=>{
    const registerModal =useregisterModal();
    const loginModal =useLoginModal();
    const [email,setEmail]=useState("")
    const [password,setpassword]=useState("")
    const [name,setName]=useState("")
    const [username,setUserName]=useState("")
    const [isLoading,setIsLoading]=useState(false);

const onToggle=()=>{
    if(isLoading){
        return;
    }
    registerModal.onClose()
    loginModal.onOpen()
}

    const onSubmit =useCallback(async()=>{
        try{
            setIsLoading(true);

            //todo  ado log in

            registerModal.onClose();
        }
        catch(error){
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    },[registerModal])

const bodyContent=(
    <div className="flex flex-col gap-4">
        <Input placeholder="Name" onChange={(e)=>setName(e.target.value)} value={name} disabled={isLoading}/>
        <Input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email} disabled={isLoading}/>
        <Input placeholder="Username" onChange={(e)=>setUserName(e.target.value)} value={username} disabled={isLoading}/>
        <Input placeholder="Password" onChange={(e)=>setpassword(e.target.value)} value={password} disabled={isLoading}/>

    </div>
)
const footerContent=(
    <div className="text-neutral-400 text-center mt-4">
        <p>Already have an account?</p>
        <span onClick={onToggle} className="text-white cursor-pointer hover:underline">Sign In</span>

    </div>
)
    return(
        <>
        <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Create an account "
actionLabel="Sign Up"
onClose={registerModal.onClose}
onSubmit={onSubmit}
body={bodyContent}
footer={footerContent}/>
        </>
    )
}

export default RegisterModal