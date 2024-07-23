import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end();
  }
  try {
    const { userId ,currentUserId } = req.body;
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid Id");
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error("Inalid Id");
    }

    let updateFollowingIds = [...(user?.followingIds || [])];

    if (req.method == "POST") {
      updateFollowingIds.push(userId);
      try{
      await prisma.notification.create({
          data: {
            body: "Someone Follow You",
            userId: userId,
          },
        });
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            hasNotification: true,
          },
        });
      
    } catch (error) {
      console.log(error);
    }
    }
    if (req.method == "DELETE") {
      updateFollowingIds = updateFollowingIds.filter(
        (followindid) => followindid !== userId
      );
    }
    const updateUser = await prisma.user.update({
        where:{
            id:currentUserId
        },
        data:{followingIds:updateFollowingIds}
    })
    return res.status(200).json("updated followings")
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
