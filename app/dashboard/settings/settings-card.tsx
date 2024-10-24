"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Session } from "next-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SettingSchema } from "@/type/settings-schema";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import FormError from "@/components/auth/form-error";
import FormSuccess from "@/components/auth/form-success";
import { useAction } from "next-safe-action/hooks";
import { Settings } from "lucide-react";
import { setting } from "@/server/actions/settings";

const SettingCard = ({ session }: { 
  session: Session }) => {


      const [error, setError]=useState<string | undefined>("");
      const [success, setSuccess]=useState<string | undefined>("");
      const [avatarUploading, setAvatarUploading]=useState(false);



  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      name: session.user?.name || undefined,
      email: session.user?.email || undefined,
      isTwoFactorEnabled: session.user.isTwoFactorEnabled || undefined,
      image: session.user?.image || undefined
    },
  });

  const {execute, status} = useAction(setting, {
    
    onSuccess: (data)=>{
      if(data.data?.success) setSuccess(data.data.success)
      if(data.data?.error) setError(data.data.error)
    },
    onError: (error)=>{
      setError('Something went wrong')
    }
  })
   
  const onSubmit = (values: z.infer<typeof SettingSchema>) => {
   execute(values)
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Settings</CardTitle>
        <CardDescription>Update your account settings</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Mounir"
                      {...field}
                      disabled={status === "executing"}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <div className="flex items-center gap-4 ">
                    {!form.getValues("image") && (
                      <div className="font-bold">
                        {session.user?.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    {form.getValues("image") && (
                      <Image
                        className="rounded-full"
                        src={form.getValues("image")!}
                        width={42}
                        height={42}
                        alt="User Image"
                      />
                    )}
                  </div>
                  <FormControl>
                    <Input
                      placeholder="User Image"
                      {...field}
                      type="hidden"
                      disabled={status === "executing"}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="**********"
                      type="password"
                      {...field}
                      disabled={status === "executing" || session.user.isOAuth}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input

                      type="password"
                      placeholder="**********"
                      {...field}
                      disabled={status === "executing" || session.user.isOAuth}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
          control={form.control}
          name="isTwoFactorEnabled"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Two Factor Authentification</FormLabel>
              <FormDescription>
                Enable two factor Authentification for your account
              </FormDescription>
              <FormControl>
                <Switch disabled={status==="executing" || session.user.isOAuth === true}
                checked={field.value}
                onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
            <Button disabled ={status==='executing' || avatarUploading}type="submit">Update</Button>           

          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SettingCard;
