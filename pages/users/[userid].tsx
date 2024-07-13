import React from 'react'
import Header from '../component/Header'
import { useRouter } from 'next/router';
import { ClipLoader } from "react-spinners"
import useUser from '../component/hooks/useUser';
import UserHero from '../component/users/UserHero';
import UserBio from '../component/users/UserBio';

const UserView = () => {
    const router = useRouter();
    const { userid } = router.query;
    const { data: fetchedUser, isLoading } = useUser(userid as string);
    if (isLoading || !fetchedUser) {
        return (
            <div className='flex justify-center items-center h-full'>
                <ClipLoader color="lightblue" size={80}/>

            </div>
        )
    }


    return (
        <>
        <Header label={`${fetchedUser?.name}`} showBackArrow />
        <UserHero userid={userid as string}/>
        <UserBio userid={userid as string}/>
        </>

    )
}

export default UserView