import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("index i am ")
  try {
    if (req.method === "POST") {
      //   const { currentUser } = await serverAuth(req);

      // Type assertion to ensure body is a string
      const { body }: { body: string } = req.body;

      // Ensure currentUser.id is a string
      const { userId }: { userId: string } = req.body;
      console.log(req.body);
      const post = await prisma.post.create({
        data: {
          body,
          userId,
          likedIds: [],
        },
      });

      return res.status(200).json(post);
    }

    if (req.method === "GET") {
      const { userId } = req.query;
      let posts;

      if (userId && typeof userId === "string") {
        posts = await prisma.post.findMany({
          where: {
            userId,
          },
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        posts = await prisma.post.findMany({
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }

      return res.status(200).json(posts);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
