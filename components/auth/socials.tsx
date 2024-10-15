'use client'

import { signIn } from "next-auth/react"
import { Button } from "../ui/button"
import {FcGoogle} from 'react-icons/fc'
import {FaGithub} from 'react-icons/fa'
export default function Socials(){
    return(
        <div className="flex flex-col items-center w-full gap-4">
            <Button
            variant={"outline"}
            onClick={()=>
                signIn("google",{
                    redirect:false,
                    callbackUrl:"/"
                })
            }
            className="flex gap-3 w-2/3"
            >
                <p>Sign in with GOOGLE</p>
                <FcGoogle /> 
            </Button>

            <Button
            variant={"outline"}
            onClick={()=>
                signIn("github",{
                    redirect: false,
                    callbackUrl: "/"
                })
            }
            className="flex gap-4 w-2/3"
            >
                <p>Sign in with GITHUB</p>
                <FaGithub/>
            </Button>
        </div>
    )
}