"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { BsTwitterX } from 'react-icons/bs';

function SidebarLogo() {
    const router = useRouter();
  return (
    <div onClick={()=>router.push("/")} className='rounded-full h-14 w-14 p-4 flex ietms-center justify-center hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition/'>
       <BsTwitterX size={28} color='white'/></div>
  )
}

export default SidebarLogo