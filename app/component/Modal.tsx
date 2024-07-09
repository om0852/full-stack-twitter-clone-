import React, { useCallback } from 'react'
interface ModalProp{
    isOpen?:boolean,
    onClose:()=>void,
    onSubmit:()=>void,
    title:string,
    body?:React.ReactElement,
    footer?:React.ReactElement,
    actionLabel:string,
    disabled?:boolean
}
const Modal:React.FC<ModalProp>=({isOpen,onClose,onSubmit,title,body,footer,actionLabel,disabled})=> {
    const handleClose = useCallback(()=>{
        if(disabled){
            return;
        }
        onClose();
    },[disabled,onClose]);

    const handleOnSubmit=useCallback(()=>{
        if(disabled){
            return;
        }
        onSubmit();
    },[disabled,onSubmit])
  return (
    <div>Modal</div>
  )
}

export default Modal