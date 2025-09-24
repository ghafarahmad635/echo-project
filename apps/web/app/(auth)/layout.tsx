
import AuthLayout from '@/modules/components/ui/layouts/auth-layout'
import React from 'react'
interface Props{
    children:React.ReactNode
}
const layout = ({children}:Props) => {
  return (
    <AuthLayout>
     
          {children}
      
      
    </AuthLayout>
  )
}

export default layout
