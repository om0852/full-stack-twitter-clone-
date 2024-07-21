
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
)
{
    try{
const currentUser = await serverAuth(req);
res.status(200).json(currentUser);
    }
    catch(error){
        console.log(error);
        return res.status(400).end();
    }
}