import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";



export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method!=="POST" && req.method!=="DELETE"){
        return res.status(405).end();
    }
    try {
        console.table(req.body)
        const {postId,userId}=req.body;
        if(!postId){
            throw new Error("Invalid Id");
        }
        const post = await prisma?.post.findUnique(   
        {where:{
            id:postId
        }})
        if(!post){
            throw new Error("Invalid Id");
        }
        let updateLike = [...(post.likedIds||[])];
        if(req.method==="POST"){
            updateLike.push(userId);
        }
        if(req.method==="DELETE"){
            updateLike=updateLike.filter(item=>item!=userId);
        }
        const updatePost = await prisma?.post.update({
            where:{
                id:postId
            },
            data:{
                likedIds:updateLike
            }
        })
        return res.status(200).json("Like Post");
    } catch (error) {
        console.log(error)
        return res.status(400).end();
    }
}