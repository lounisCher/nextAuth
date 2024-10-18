'use client'

import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import AuthCard from "./auth-card"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema } from "@/type/login-schema"
import { z } from "zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"
import { emailSignIn } from "@/server/actions/email-signin"
import {useAction} from 'next-safe-action/hooks'
import { cn } from "@/lib/utils"
import { useState } from "react"
import FormSuccess from "./form-success"
import FormError from "./form-error"
import { error } from "console"


const LoginForm = () => {

  const [error, setErrors] = useState("");
  const [success, setSucess] = useState("");

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues:{
      email:"",
      password: "",
    }
  });

  const {execute, status} = useAction(emailSignIn, {
    onSuccess(data){
      console.log(data)
    }
  });

  const onSubmit =(values: z.infer<typeof LoginSchema>)=>{
    execute(values)
  };

  return (
    <AuthCard cardTitle="Welcome back!" 
    backButtonHref="/auth/register" backButtonLabel="Create a new account"
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
                <p>Email</p>
              </FormLabel>
              <FormControl>
                <Input
                {...field}
                type="email"
                autoComplete="email"
                placeholder="azaz@gmail.com"
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
             control={form.control}
             name="password"
             render={({field}) => (
            <FormItem>
              <FormLabel>
              <p>Password</p>
              </FormLabel>
              <FormControl>
                <Input
                {...field}
                type="password"
                placeholder="*********"
                autoComplete="current-password"
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
          {"login"}
        </Button>
            </form>
          </Form>
        </div>
    </AuthCard>
  )
}

export default LoginForm
