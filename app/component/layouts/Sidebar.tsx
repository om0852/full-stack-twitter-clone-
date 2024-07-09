
"use client"
import React from 'react'
import { BsBellFill, BsHouseFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import SidebarLogo from './SidebarLogo'
import SidebarItems from './SidebarItems'
import { BiLogOut } from 'react-icons/bi'
import SidebarTweetButton from './SidebarTweetButton'

const Sidebar: React.FC = () => {
    const items = [
        {
            label: "Home",
            href: "/",
            Icon: BsHouseFill
        },
        {
            label: "Notification",
            href: "/",
            Icon: BsBellFill
        },
        {
            label: "Profile",
            href: "/users/123",
            Icon: FaUser
        },

    ]

    return (
        <div className='col-span-1 h-full pr-4 md:pr-6'>
            <div className='flex flex-col items-start'>
                <div className=' flex flex-col items-start space-y-2 lg:w-[230px] flex justify-start'>
                    <SidebarLogo />
                    {items.map((data,index) => {
                        return (
                            <SidebarItems Icon={data.Icon} href={data.href} label={data.label} key={index}/>
                        )
                    })}
                </div>
                <SidebarItems Icon={BiLogOut} onClick={()=>{}} label={"Logout"}/>
                    <SidebarTweetButton/>
            </div>
        </div>
    )
}

export default Sidebar