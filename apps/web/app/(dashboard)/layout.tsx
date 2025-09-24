
import AuthGuard from '@/modules/components/auth-gaurd'
import OrganizationGuard from '@/modules/components/organization-gurd'

import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
   
  return (
    <AuthGuard>
        <OrganizationGuard>
            {children}
        </OrganizationGuard>
      
    </AuthGuard>
  )
}

export default layout
