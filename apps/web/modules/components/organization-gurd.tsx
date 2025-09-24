'use client'

import { useOrganization } from "@clerk/nextjs"
import AuthLayout from "./ui/layouts/auth-layout"
import OrgSelectView from "./ui/views/org-select-view"

const OrganizationGuard = (
    {children}: 
    {children: React.ReactNode}) => {
        const {organization }=useOrganization()
        if(!organization){
            return <AuthLayout>
                <OrgSelectView />
            </AuthLayout>
        }
  return (
    <div>
      {children}
    </div>
  )
}

export default OrganizationGuard
