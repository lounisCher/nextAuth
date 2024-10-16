'use client'

import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import AuthCard from "./auth-card"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterSchema } from "@/type/register-schema"
import { z } from "zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"
import {useAction} from 'next-safe-action/hooks'
import { cn } from "@/lib/utils"
import { useState } from "react"


const RegisterForm = () => {

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues:{
      email:"",
      password: "",
      name:"",
    }
  });

  const [error, setError]=useState("");

  const {execute, status} = useAction();

  const onSubmit =(values: z.infer<typeof RegisterSchema>)=>{
    execute(values)
  };

  return (
    <AuthCard cardTitle="Create an account" 
    backButtonHref="/auth/login" backButtonLabel="Already have an account ?"
    showSocials>
        <div>
        <FormField
             control={form.control}
             name="name"
             render={({field}) => (
            <FormItem>
              <FormLabel>
              <p>User Name</p>
              </FormLabel>
              <FormControl>
                <Input
                {...field}
                type="text"
                placeholder="Enter your name"                
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button size={"sm"} variant={"link"} asChild>
          <Link href="/auth/reset">Forgot your password</Link>
        </Button>
        </div>
        <Button type="submit" className={cn('w-full', status === 'executing' ? 'animate-pulse':"")}>
          {"Regiser"}
        </Button>
            </form>
          </Form>
        </div>
    </AuthCard>
  )
}

export default RegisterForm
