import React from 'react'
import Sidebar from './layouts/Sidebar'
import Followbar from './Followbar'
import Header from './Header'
interface LayoutsProp {
    children: React.ReactNode
}
const Layout: React.FC<LayoutsProp> = ({ children }) => {

    return (
        <div className='h-screen bg-black-400' style={{background:"#181717"}}>
            <div className='container h-full  xl:px-10'>
                <div className='grid grid-cols-4 h-full'>
                    <Sidebar/>
                    <div className='col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800'>
                    {children}
                    </div>
                    <Followbar/>
                </div>
            </div>
        </div>
    )
}

export default Layout