"use client"
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { FaFeather } from 'react-icons/fa'
import useLoginModal from '../hooks/UserLoginModal'

function SidebarTweetButton() {
    const router=useRouter()
    const loginModal=useLoginModal()
    const onclick=useCallback(()=>{
loginModal.onOpen()
    },[loginModal])
  return (
    <>
    <div
    className='mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer'
    onClick={onclick}
    >
     <FaFeather size={24} color='white'/>
        </div>
        <div     onClick={onclick}
 className='mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-500 hover:bg-opacity-90 cursor-pointer transistion'>
<p className='hidden lg:block text-center font-semibold text-white text-[20px]'>Tweet</p>
        </div>
        </>
  )
}

export default SidebarTweetButton