import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb"
export const config = { api: { bodyParser: { sizeLimit: '25mb' } } }
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method} = req;
    console.log("req")
    console.log(req.body)
    if(method!=="PATCH"){
        return res.status(405).end();
    }
    try {
        // const currentUser = await serverAuth(req);
        const {username,name,bio,profileImage,coverImage,id}=req.body;
        if(!name || !username){
            return res.status(400).json({message:"name and username are required."});
        }
        const updateUser = await prisma.user.update({
            where:{
                id:id
            },
            data:{
                name,username,bio,profileImage,coverImage
            }
        })
        console.log("done")

        return res.status(200).json(updateUser);
    } catch (error) {
console.log(error)
        return res.status(400).end();
    }
}