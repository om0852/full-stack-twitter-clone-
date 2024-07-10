import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "@/libs/prismadb"


export default NextAuth({
    adapter:PrismaAdapter(prisma),
    providers:[
        CredentialsProvider({
            name:"credentials",
            credentials:{
                email:{label:"email",type:"text"},
                password:{label:"password",type:"password"}
            },
            async authorize(credentials){
                if(!credentials?.email ||!credentials?.password){
                    throw new Error("Invalid credentials")
                }
                try {
                    const user = await prisma.user.findUnique({
                      where: {
                        email: credentials.email,
                      },
                    });
          
                    // Check if user exists and has a hashed password
                    if (!user || !user.hashedPassword) {
                      throw new Error("Invalid credentials. Email or password is incorrect.");
                    }
          
                    // Compare password with hashed password using bcrypt
                    const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);
          
                    if (!isCorrectPassword) {
                      throw new Error("Invalid credentials. Password is incorrect.");
                    }
          
                    // User successfully authenticated, return user object
                    return user;
                  } catch (error) {
                    console.error("Error during authentication:", error);
                    // Optionally handle specific errors (e.g., database connection issues)
                    throw new Error("Authentication failed. Please try again later.");
                  }
            }

        })
    ],
    debug :process.env.NODE_ENV ==="development",
    session:{
        strategy:"jwt"
    },
    jwt:{
        secret:process.env.NEXTAUTH_JWT_SECRET
    },
    secret:process.env.NEXTAUTH_SECRET
})