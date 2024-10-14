import React from 'react'

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
    <div>
      
    </div>
  )
}

export default AuthCard
