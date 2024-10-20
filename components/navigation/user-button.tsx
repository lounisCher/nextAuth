"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { LogOut, Moon, Settings, Sun, Truck, TruckIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Switch } from "../ui/switch";
import { useRouter } from "next/navigation";

export const UserButton = ({ user }: Session) => {
  const {setTheme, theme} = useTheme();
  const [checked, setChekecked] = useState(false)
  const router = useRouter()
  const setSwitch = () =>{
    switch(theme){
      case "dark" : return setChekecked(true)
      case "light" : return setChekecked(false)
      case "system" : return setChekecked(false)
    }
  }
  if (user)
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Avatar>
            {user.image && (
              <Image src={user.image} alt={user.name!} fill={true} />
            )}
            {!user.image && (
              <AvatarFallback className="bg-primary/25">
                <div className="font-bold text-2xl">
                  {user.name?.charAt(0).toLocaleUpperCase()}
                </div>
              </AvatarFallback>
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-6" align="end">
          <div className="mb-4 p-4 flex flex-col items-center">
            {user.image && (
              <Image src={user.image} alt={user.name!} width={36} height={36} />
            )}
            <p className="font-bold">{user.name}</p>
            <span className="font-medium">{user.email}</span>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={()=>router.push('/dashboard/orders')} className=" group py-2 font-medium cursor-pointer">
            <TruckIcon
              size={16}
              className=" mr-1 group-hover:translate-x-1 "
            />{" "}
            My Orders
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=>router.push("/dashboard/settings")} className=" group py-2 font-medium cursor-pointer  ">
            <Settings
              size={16}
              className="mr-1 group-hover:rotate-180 transition-all ease-in-out"
            />{" "}
            Settings
          </DropdownMenuItem>
          {theme && (
          <DropdownMenuItem className="py-2 font-medium cursor-pointer group">
            <div className="flex items-center group" onClick={(e)=>e.stopPropagation()}>
              {theme==="light"?<Sun size={16} className="group-hover:text-yellow-600 group-hover:rotate-180 transition-all ease-in-out" />:<Moon size={16}
              className="group-hover:text-blue-400 group-hover:rotate-180 transition-all ease-in-out" />}
                       
              <p className="dark:text-blue-400 text-secondary-foreground/75 text-yellow-600 mx-3">
                {theme[0].toUpperCase()+theme.slice(1)} Mode
              </p>
              <Switch 
              className="scale-75"
              checked={checked} onCheckedChange={(e)=>{
                setChekecked((prev)=>!prev)
                if(e) setTheme("dark")
                if(!e) setTheme("light")  

              }}/>
            </div>
          </DropdownMenuItem>
          )} 
          <DropdownMenuItem
            className="group py-2 font-medium cursor-pointer focus:bg-destructive/30 duration-300"
            onClick={() => signOut()}
          >
            <LogOut size={16} className="mr-1 group-hover:scale-75 " />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
};
