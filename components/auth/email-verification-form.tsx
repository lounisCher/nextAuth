'use client'

import { newVerification } from "@/server/actions/tokens";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import AuthCard from "./auth-card";
import FormSuccess from "./form-success";
import FormError from "./form-error";

const EmailVerificationForm=()=>{
    const token = useSearchParams().get("token");
    const router = useRouter();
    const [success, setSuccess] = useState('');
    const [error, setError] = useState("");

    const handleVerification = useCallback(()=>{
        if(success || error) return
        if(!token){
            setError("No tokken Found")
            return
        }
        newVerification(token).then((data)=>{
            if(data.error) setError(data.error);
            if(data.success){
             setSuccess(data.success)
             router.push("/auth/login")
            } 
        })
    }, []);

    useEffect(()=>{
        handleVerification()
    },[])
        
    

    return(
       <AuthCard
       cardTitle="Verify your account"
       backButtonLabel="Back to login"
       backButtonHref="/auth/login"
       >
        <div className="flex flex-col items-center justify-center w-full">
            <p className="text-xl font-bold">
                {!success && !error ? 'verifying email...':null}
            </p>
        <FormSuccess message={success}/>
        <FormError message={error}/>
        </div>
       </AuthCard>
    )
}

export default EmailVerificationForm;