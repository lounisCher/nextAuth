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
            <CardTitle>{cardTitle}</CardTitle>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
        {showSocials && (
            <CardFooter>
                <Socials />
            </CardFooter>
        )}
        <CardFooter>
            <BackButton
            href={backButtonHref} 
            label={backButtonLabel}
            />
        </CardFooter>
    </Card>
  )
}

export default AuthCard
