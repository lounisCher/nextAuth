'use server'
import { LoginSchema } from "@/type/login-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { generateEmailVerificaitonToken, getVerificationTokenByEmail } from "./tokens";
import { sendVerificationEmail } from "./email";
import { signIn } from "next-auth/react";

const action = createSafeActionClient();

export const emailSignIn= action.schema(LoginSchema).action(async({ parsedInput: { email, password, code } })=>{

    try{
        //check if the user is in the database 
   const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email)
   });
   
   if (existingUser?.email !== email){
    return {error: "Email is not found"}
   };

   //check if user email is verified

   if(!existingUser.emailVerified){
    const verificationToken =  await generateEmailVerificaitonToken(existingUser.email);
    await sendVerificationEmail(
        verificationToken[0].email,
        verificationToken[1].token,
    )
    return {success: 'Confirmation email sent'}

   }

   //sign in the user

   await signIn('credentials',{
    email,
    password,
    redirectTo:'/'
   }
   )

    return {success: email};

    }catch(error){
        console.log(error)
    }
    

   
   

});