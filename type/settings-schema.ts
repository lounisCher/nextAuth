import { z } from "zod";

export const SettingSchema = z.object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    image: z.optional(z.string()),
    password: z.optional(z.string().min(8)),
    newPassword: z.optional(z.string().min(8)),
    isTwoFactorEnabled: z.optional(z.boolean())
}).refine((data)=>{
    if(data.password && !data.newPassword){
        return false;
    }
    return true;
}, {message: "New password is required", path:["newPassword"]})