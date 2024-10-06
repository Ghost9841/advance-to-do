import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials:{
                email: {label: "Username", type: "text", placeholder: "jsmith"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials: any):Promise<any>{
                await dbConnect();
                try{
                    const user = await UserModel.findOne({
                        $or : [
                            {email: credentials.email},
                            {username: credentials.username}
                        ]
                    });
                    if(!user) {
                        throw new Error("User not found");
                    }
                    if(!user.isVerified){
                        throw new Error("Verify your email first");
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                    if(isPasswordCorrect){
                        return user;
                    }else{
                        throw new Error("Wrong password");
                    }
                }catch(err: any){
                   throw new Error(err);
                }
                
                
            }
        })
    ],
    pages: {
        signIn: "/sign-in"
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({session, token}){
            if(token){
                session.user.id = token.id;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessages = token.isAcceptingMessages;
                session.user.username = token.username;
            }
            return session;
        },
        async jwt({token, user}){
            if(user){
                token.id = user.id?.toString();
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
                token.username = user.username;
            }
            return token;
        }
    }
}