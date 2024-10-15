import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import Socials from './socials'
import { BackButton } from './back-button'

interface Props{
    children: React.ReactNode,
    cardTitle: string,
    backButtonHref: string,
    backButtonLabel: string,
    showSocials?: boolean,

}

const AuthCard = ({
    children,
    cardTitle,
    backButtonHref,
    backButtonLabel,
    showSocials,
}: Props) => {
  return (
    <Card>
        <CardHeader>
            <CardTitle>
                <p className='text-2xl font-bold'>{cardTitle}</p>
            </CardTitle>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
        {showSocials && (
            <CardFooter>
                <Socials />
            </CardFooter>
        )}
        <CardFooter className='flex items-center justify-center'>
            <BackButton
            href={backButtonHref} 
            label={backButtonLabel}
            />
        </CardFooter>
    </Card>
  )
}

export default AuthCard
