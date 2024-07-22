export const config = {
    api: {
      bodyParser: {
        sizeLimit: '50mb', // Set desired value here
      },
    },
  };

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb"
export default async function handler(req:NextApiRequest,res:NextApiResponse){
// console.log(req.method)
    if(req.method!=="GET"){
        return res.status(405).end();
    }
    try{
const users = await prisma.user.findMany({orderBy:{
    createdAt:"desc"
}})
return res.status(200).json(users)
    }catch(error){
        return res.status(40).end();

    }
}