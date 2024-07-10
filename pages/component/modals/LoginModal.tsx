"use client"
import { useCallback, useState } from "react";
import useLoginModal from "../hooks/UserLoginModal"
import Input from "../Input";
import { Modak } from "next/font/google";
import Modal from "../Modal";
import useRegisterModal from "../hooks/userRegisterModal";

const LoginModal=()=>{
    const loginModal =useLoginModal();
    const registerModal =useRegisterModal();
    const [email,setEmail]=useState("")
    const [password,setpassword]=useState("")
    const [isLoading,setIsLoading]=useState(false);

    const onToggle=()=>{
        if(isLoading){
            return;
        }
        loginModal.onClose()
        registerModal.onOpen()
    }
    

    const onSubmit =useCallback(async()=>{
        try{
            setIsLoading(true);

            //todo  ado log in

            loginModal.onClose();
        }
        catch(error){
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    },[loginModal])

const bodyContent=(
    <div className="flex flex-col gap-4">
        <Input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email} disabled={isLoading}/>
        <Input placeholder="Password" onChange={(e)=>setpassword(e.target.value)} value={password} disabled={isLoading}/>

    </div>
)

const footerContent=(
    <div className="text-neutral-400 text-center mt-4">
        <p>Create an account?</p>
        <span onClick={onToggle} className="text-white cursor-pointer hover:underline">Sign Up</span>

    </div>
)
    return(
        <>
        <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
actionLabel="Sign In"
onClose={loginModal.onClose}
onSubmit={onSubmit}
body={bodyContent}
footer={footerContent}
/>
        </>
    )
}

export default LoginModal