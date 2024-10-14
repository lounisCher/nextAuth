'use client'

import { Session } from "next-auth"
import { Button } from "../ui/button"
import { signOut } from "next-auth/react"

export const UserButton=({user}: Session)=>{
    return(
        <div className="flex gap-3 px-2 items-center justify-center">
            <span>
                {user?.name}
            </span>
            <Button onClick={()=>signOut()}>Sign Out</Button>
        </div>
        
    )
}