import { OrganizationList } from '@clerk/nextjs'
import React from 'react'

const OrgSelectView = () => {
  return (
    <div>

      <OrganizationList 
      skipInvitationScreen
      hidePersonal
      afterCreateOrganizationUrl='/'
      afterSelectOrganizationUrl='/'

      />
    </div>
  )
}

export default OrgSelectView
