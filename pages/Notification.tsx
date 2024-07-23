import { NextPageContext } from "next";
import Header from "./component/Header";
import { getSession } from "next-auth/react";
import NotificationFeed from "./component/NotificationFeed";
import { useEffect } from "react";
import useCurrentUser from "./component/hooks/useCurrentUser";
export async function getServerSideProps(context:NextPageContext){
    const session=await getSession(context);
    if(!session){
        return{
            redirect:{
                destination:"/",
                permanent:false
        }
    }
}
return {props:{
    session
}}

}

const Notification=()=>{
    const {data:currentUser}=useCurrentUser();
    useEffect(()=>{
        async function handle(){

            const response = await fetch('/api/notification', {
                method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: currentUser?.id })
    })
    }
    handle();
    },[])
return(
    <>
    <Header label="Notification" showBackArrow/>
    <NotificationFeed/>
    </>
)
}
export default Notification