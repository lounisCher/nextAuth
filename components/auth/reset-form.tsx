'use client'

import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import AuthCard from "./auth-card"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"
import {useAction} from 'next-safe-action/hooks'
import { cn } from "@/lib/utils"
import { useState } from "react"
import FormSuccess from "./form-success"
import FormError from "./form-error"
import { ResetSchema } from "@/type/reset-schema"
import { reset } from "@/server/actions/password-reset"


const ResetForm
 = () => {

  const [error, setErrors] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues:{
        email: "",
    }
  });

  const {execute, status} = useAction(reset, {
    onSuccess(data){
      if(data.data?.error) setErrors(data.data?.error);
      if(data.data?.success) setSuccess(data.data.success)
    }
  });

  const onSubmit =(values: z.infer<typeof ResetSchema>)=>{
    execute(values)
  };

  return (
    <AuthCard cardTitle="Forget your password ?" 
    backButtonHref="/auth/login" backButtonLabel="Back to login"
    showSocials>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
        <FormField
             control={form.control}
             name="email"
             render={({field}) => (
            <FormItem>
              <FormLabel>
              <p>Password</p>
              </FormLabel>
              <FormControl>
                <Input
                {...field}
                type="email"
                placeholder="azaz@gmail.com"
                disabled={status==='executing'}
                autoComplete="email"
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormSuccess message={success} />
        <FormError message={error} />
        <Button size={"sm"} variant={"link"} asChild>
          <Link href="/auth/reset">Forgot your password</Link>
        </Button>
        </div>
        <Button type="submit" className={cn('w-full', status === 'executing' ? 'animate-pulse':"")}>
          {"Reset password"}
        </Button>
            </form>
          </Form>
        </div>
    </AuthCard>
  )
}

export default ResetForm;

