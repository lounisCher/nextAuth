'use server'

import { NewPasswordSchema } from "@/type/password-schema"
import { createSafeActionClient } from "next-safe-action"
import { getPasswordResetTokenByToken } from "./tokens"
import { db } from ".."
import { eq } from "drizzle-orm"
import { passwordResetTokens, users } from "../schema"
import bcrypt from 'bcrypt';
import { Pool } from '@neondatabase/serverless'
import { drizzle } from "drizzle-orm/neon-serverless"

const action = createSafeActionClient()

export const newPassword = action.schema(NewPasswordSchema)
.action(async(
    { parsedInput: { password, token} })=>{

        const pool = new Pool({connectionString: process.env.POSTGRES_URL})
        const dbPool = drizzle(pool);

        if(!token){
            return {error: "Missing token"}
        }
        const existingToken = await getPasswordResetTokenByToken(token);
        if(!existingToken){
            return {error: "Token not found"}
        }
        const hasExpired = new Date(existingToken.expires) < new Date();
        if(hasExpired){
            return {error: "Token Expired"}
        }

        const existingUser = await db.query.users.findFirst({
            where: eq(users.email, existingToken.email),
        })

        if(!existingUser){
            return {error: "User doest not exist"}
        }

        const hashedPassword = await bcrypt.hash(password, 10);

       await dbPool.transaction(async(tx)=>{

        //update user password
        await tx.update(users).set({
            password: hashedPassword
        }).where(eq(users.id, existingUser.id))
        //delete the users token
        await tx.delete(passwordResetTokens).where(eq(
            passwordResetTokens.id, existingUser.id
        ))


       })

       return {success: "Password updated"}


 

    }
)