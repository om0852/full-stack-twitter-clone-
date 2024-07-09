"use client"
import { useCallback, useState } from "react";
import useLoginModal from "../hooks/UserLoginModal"
import Input from "../Input";
import { Modak } from "next/font/google";
import Modal from "../Modal";

const LoginModal=()=>{
    const loginModal =useLoginModal();
    const [email,setEmail]=useState("")
    const [password,setpassword]=useState("")
    const [isLoading,setIsLoading]=useState(false);

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

    return(
        <>
        <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
actionLabel="Sign In"
onClose={loginModal.onClose}
onSubmit={onSubmit}
body={bodyContent}/>
        </>
    )
}

export default LoginModal