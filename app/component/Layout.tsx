import React from 'react'
import Sidebar from './layouts/Sidebar'
interface LayoutsProp {
    children: React.ReactNode
}
const Layout: React.FC<LayoutsProp> = ({ children }) => {

    return (
        <div className='h-screen bg-black'>
            <div className='container h-full  xl:px-10'>
                <div className='grid grid-cols-4 h-full'>
                    <Sidebar/>
                    <div className='col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800'>
                    {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout