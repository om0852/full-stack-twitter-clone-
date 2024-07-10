"use client"
import React from 'react'
import { IconType } from 'react-icons'
interface SidebarItemsProp {
    label: string,
    href?: string,
    Icon: IconType,
    onClick?: () => void
}
const SidebarItems: React.FC<SidebarItemsProp> = ({ label, href, Icon, onClick }) => {
    return (
        <div className='flex flex-row items-center'>
            <div className='relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden'>
                <Icon size={20} color='white' />
            </div>
            <div className='relative hidden  lg:flex items-center justify-center p-4 gap-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer '>
                <Icon size={20} color='white' />
                <p className='text-white hidden lg:block text-xl'>{label}</p>
            </div>
        </div>
    )
}

export default SidebarItems