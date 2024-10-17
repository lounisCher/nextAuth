'use server'
import { createSafeActionClient } from "next-safe-action";
import { RegisterSchema } from "@/type/register-schema";
import bcrypt from 'bcrypt'
import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";
const action = createSafeActionClient();

export const emailRegister = action.schema(RegisterSchema).action(async({ parsedInput: { email, password, name } })=>{
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword);
    const existingUser= await db.query.users.findFirst({
        where: eq(users.email, email)
    })
    if(existingUser){
        //if(!existingUser.emailVerified){
            //const verificationToken = 
        //}
        return {error: "Email already exist"}
    }
    return {success:'yaaayyy'}
});