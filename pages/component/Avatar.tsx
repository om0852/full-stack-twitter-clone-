import React, { useCallback } from 'react'
import useUser from './hooks/useUser';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
interface AvatarProps{
    userId:string;
    isLarge?:boolean;
    hasBorder?:boolean
}
const  Avatar:React.FC<AvatarProps>=({userId,isLarge,hasBorder})=> {
    const router = useRouter()
    const {data:fetchUser}=useUser(userId);
    const onClick=useCallback((event:any)=>{
event.stopPropagation();
const url=`/users/${userId}`;
router.push(url)
    },[router,userId])
  return (
    <div className={`
        ${hasBorder?"border-4 border-black":""}
        ${isLarge?"h-32":"h-12"}
        ${hasBorder?"w-32":"w-12"}
        rounded-full hover:opacity-90 transition cursor-pointer relative
    `}>
        <Image
        fill style={{
            objectFit:"cover",
            borderRadius:"100%",
            
        }}
        alt='Avatar'
        onClick={onClick}
        src={fetchUser?.profileImage|| "/images/default_avatar.png"}
        />
    </div>
  )
}

export default Avatar