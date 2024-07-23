import { NextPageContext } from "next";
import Header from "@/pages/component/Header";
import { getSession } from "next-auth/react";
import NotificationFeed from "@/pages/component/NotificationFeed";
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
return session
}

const notification=()=>{
return(
    <>
    <Header label="Notification" showBackArrow/>
    <NotificationFeed/>
    </>
)
}
export default notification