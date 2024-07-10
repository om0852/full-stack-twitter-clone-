import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const serverAuth =async (req:NextApiRequest)=>{
    const session= await getSession({req});

    if(!session?.user?.email){
        throw new Error("Not Sign In")
    }
    const currentUser=await prisma?.user.findUnique({
        where:{
            email:session.user.email
        }
    })
    if(!currentUser){
        throw new Error("Not Sign In")
    }
    return currentUser;
}
export default serverAuth