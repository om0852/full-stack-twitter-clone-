import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb"
export default async function handler(req:NextApiRequest,res:NextApiResponse){

await prisma.user.update({
    where:{
        id:req.body.userId
    },
    data:{
        hasNotification:false
    }
})

}