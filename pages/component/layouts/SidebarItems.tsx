"use client"
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { IconType } from 'react-icons'
import { BsDot } from 'react-icons/bs'
import useCurrentUser from '../hooks/useCurrentUser'
import LoginModal from '../modals/LoginModal'
import useLoginModal from '../hooks/UserLoginModal'
interface SidebarItemsProp {
    label: string,
    href?: string,
    Icon: IconType,
    onClick?: () => void
    auth?:boolean;
    alert?:boolean;
}
const SidebarItems: React.FC<SidebarItemsProp> = ({ label, href, Icon, onClick,auth,alert }) => {
    const router =useRouter()
    const loginModal=useLoginModal();
    const {data:currentuser}=useCurrentUser();

    const onClickHandler=useCallback(()=>{
if(onClick){
    return onClick()
}
if(auth && !currentuser){
    loginModal.onOpen();
}else if(href){
    router.push(href);
} else{}
    },[router,href,onClick,currentuser,auth,LoginModal])
    return (
        <div onClick={onClickHandler} className='flex flex-row items-center'>
            <div className='relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden'>
                <Icon size={20} color='white' />{alert?<BsDot size={40} className='text-sky-500 absolute -top-4 left-0'/>:null}
            </div>
            <div className='relative hidden  lg:flex items-center justify-center p-4 gap-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer '>
            <Icon size={20} color='white' />
            <p className='text-white hidden lg:block text-xl'>{label}</p>
            {alert?<BsDot size={70} className='text-sky-500 absolute -top-4 left-0'/>:null}
            </div>
        </div>
    )
}

export default SidebarItems