import React from 'react'
interface LayoutsProp{
    children:React.ReactNode
}
const  Layout:React.FC<LayoutsProp> = ({children})=> {
  return (
    <div>
        {children}
    </div>
  )
}

export default Layout