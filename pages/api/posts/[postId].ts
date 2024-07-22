import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.query)
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { postid } = req.query;
    if (!postid || typeof postid !== "string") {
      throw new Error("Inalid Id");
    }
    const post = await prisma?.post.findUnique({
      where: {
        id: postid,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return res.status(200).json(post);
  } catch (error) {
    console.log(error)
    return res.status(400).end();
  }
}
