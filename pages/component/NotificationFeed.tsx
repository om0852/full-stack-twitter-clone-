import React, { useEffect } from 'react'
import useCurrentUser from './hooks/useCurrentUser'
import useNotifications from './hooks/useNotification';
import notification from '../Notification';
import { BsTwitter } from 'react-icons/bs';

export default function NotificationFeed() {
    const {data:currentUser,mutate:mutateCurrentUser}=useCurrentUser();
    const {data:fetchedNotifications=[]}=useNotifications(currentUser?.id);

    useEffect(()=>{
mutateCurrentUser();
    },[mutateCurrentUser])

    if(fetchedNotifications.length===0){
        return(
            <div className='text-neutral-500 text-center p-6 text-xl'>
                No Notification
            </div>
        )
    }
  return (
    <div className='flex flex-col'>
        {
            fetchedNotifications.map((notification:Record<string,any>)=>(
                <div key={notification.id} className='flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-500'>
                    <BsTwitter color='white' size={30}/>
                    <p className='text-white'>{notification.body}</p>
                    </div>
            ))
        }
    </div>
  )
}
