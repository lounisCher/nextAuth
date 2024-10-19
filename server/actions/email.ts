'use server'

import getBaseUrl from "@/lib/base-url"
import {Resend} from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY);


const domain = getBaseUrl();

export const sendVerificationEmail = async(email:string, token:string)=>{
    const confirmLink = `${domain}/auth/new-verification?token=${token}`
    console.log(confirmLink, 'ConfirmLink')
      const {data, error} = await resend.emails.send({
        from:"onboarding@resend.dev",
        to:email,
        subject:"Ecommerce- confirmation email",
        html:`<p>Click to <a href=${confirmLink}>confirm your email</a></p>`
      })
      if(error) return console.log(error)
      if (data) return data
}

export const sendPasswordResetEmail = async(email:string, token:string)=>{
  const confirmLink = `${domain}/auth/new-verification?token=${token}`
    const {data, error} = await resend.emails.send({
      from:"onboarding@resend.dev",
      to:email,
      subject:"Ecommerce- confirmation email",
      html:`<p>Click to <a href=${confirmLink}>reset your password</a></p>`
    })
    if(error) return console.log(error)
    if (data) return data
}
