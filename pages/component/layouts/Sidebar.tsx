
"use client"
import React from 'react'
import { BsBellFill, BsHouseFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import SidebarLogo from './SidebarLogo'
import SidebarItems from './SidebarItems'
import { BiLogOut } from 'react-icons/bi'
import SidebarTweetButton from './SidebarTweetButton'
import useCurrentUser from '../hooks/useCurrentUser'
import { signOut } from 'next-auth/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Sidebar: React.FC = () => {
    const router = useRouter();
    const {data:currentuser}=useCurrentUser();
    const items = [
        {
            label: "Home",
            href: "/",
            Icon: BsHouseFill
        },
        {
            label: "Notification",
            href: "/Notification",
            Icon: BsBellFill,
            auth:true,
            alert:currentuser?.hasNotification
        },
        {
            label: "Profile",
            href: `/users/${currentuser?.id}`,
            Icon: FaUser,
            auth:true
        },

    ]

    return (
        <div className='col-span-1 h-full pr-4 md:pr-6'>
            <div className='flex flex-col items-start'>
                <div className=' flex flex-col items-start space-y-2 lg:w-[230px] flex justify-start'>
                    <SidebarLogo />
                    {items.map((data,index) => {
                        return (
                            <SidebarItems  Icon={data.Icon} href={data.href} label={data.label} key={index} alert={data.alert}/>
                        )
                    })}
                </div>
                {currentuser && (
                    <SidebarItems Icon={BiLogOut} onClick={()=>{signOut()}} label={"Logout"}/>
                )}
                    <SidebarTweetButton/>
            </div>
        </div>
    )
}

export default Sidebar