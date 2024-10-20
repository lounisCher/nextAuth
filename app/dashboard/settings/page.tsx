import { auth } from "@/server/auth";
import SettingCard from "./settings-card";
import { redirect } from "next/navigation";

export default async function SettingsPage(){
    const session = await auth();
    if(!session) return redirect("/") ;
    if(session) 
        return (
           <SettingCard session={session}/>
        )
}