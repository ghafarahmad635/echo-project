'use client'
import { Authenticated, AuthLoading, Unauthenticated } from 'convex/react'
import React from 'react'
import AuthLayout from './ui/layouts/auth-layout'
import { SignInView } from './ui/views/sigin-view'
interface Props{
    children:React.ReactNode
}
const AuthGuard = ({children}:Props) => {
  return (
    <>
    <AuthLoading>
        <AuthLayout>
            <p>...loading</p>
        </AuthLayout>
    </AuthLoading>
    <Authenticated>
        <AuthLayout>
            {children}
        </AuthLayout>
    </Authenticated>
    <Unauthenticated>
        <AuthLayout>
            
            <SignInView />
        </AuthLayout>
    </Unauthenticated>
    </>
  )
}

export default AuthGuard
