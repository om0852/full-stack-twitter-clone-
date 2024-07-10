import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle non-POST requests with a 405 Method Not Allowed error
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Extract user data from request body
    const { email, username, password, name } =  req.body // Ensure proper JSON parsing

    console.log(req.body)
    // Validate required fields
    if (!email || !username || !password || !name) {
      return res.status(400).json({ message: "Missing required fields" });
    }
// Hash password securely
const hashedPassword = await bcrypt.hash(password, 12); // Adjust rounds as needed
console.log(hashedPassword)

    // Create user in Prisma database
    const user = await prisma.user.create({
      data: {
        email,
        username,
        hashedPassword,
        name,
      },
    });

    // Respond with success (consider returning only necessary user data)
    return res.status(201).json({ message: "User created successfully" }); // Or user object without sensitive data

  } catch (error:any
  ) {
    console.error(error);

    // Handle specific errors (optional)
    if (error.code === "P2002") { // Example: Unique constraint violation
      return res.status(400).json({ message: "Email or username already exists" });
    } else {
      // Generic internal server error
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
