'use server'
import { createSafeActionClient } from "next-safe-action";
import { RegisterSchema } from "@/type/register-schema";
import bcrypt from 'bcrypt'
import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";
import { generateEmailVerificaitonToken } from "./tokens";
import { sendVerificationEmail } from "./email";
const action = createSafeActionClient();

export const emailRegister = action.schema(RegisterSchema).action(async({ parsedInput: { email, password, name } })=>{
    const hashedPassword = await bcrypt.hash(password, 10)
    const existingUser= await db.query.users.findFirst({
        where: eq(users.email, email)
    })
    if(existingUser){
        if(!existingUser.emailVerified){
            const verificationToken = await generateEmailVerificaitonToken(email);

            await sendVerificationEmail(

                verificationToken[0].email,
                verificationToken[0].token,

            );

            return {success: 'Email Confirmation resent'}
        }

        return {error: "Email already exist"}
    }
     await db.insert(users).values({
        email,
        name,
        password: hashedPassword,
     })
     const verificationToken = await generateEmailVerificaitonToken(email);

     await sendVerificationEmail(

        verificationToken[0].email,       
        verificationToken[0].token,
        
    );
     return {success: "Confirmation Email set"}
});