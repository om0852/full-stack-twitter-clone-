import React from 'react'
import useUser from '../hooks/useUser'
import Image from 'next/image';
import Avatar from '../Avatar';
interface userHeroProps{
    userid:string
}
const UserHero:React.FC<userHeroProps>=({userid})=> {
    const {data:fetchedUser}=useUser(userid);
  return (
    <div>
        <div className='bg-neutral-700 h-44 relative'>
            {fetchedUser?.coverImage && (
                <Image src={fetchedUser?.coverImage}
                fill
                alt="cover-image"
                style={{objectFit:"cover"}}
                />
            )
            }
            <div className='absolute -bottom-16 left-4 '>
                <Avatar userId={userid} isLarge hasBorder/>
            </div>
        </div>
    </div>
  )
}

export default UserHero