import AuthGuard from '@/modules/components/auth-gaurd'
import OrganizationGuard from '@/modules/components/organization-gurd'
import { SidebarProvider, SidebarTrigger } from '@workspace/ui/components/sidebar'
import { cookies } from 'next/headers'
import React from 'react'
import { DashboardSidebar } from '../components/dashboard-sidebar'


const DashboardLayout = async({children}:{children: React.ReactNode}) => {
    const cookieStore = await cookies();
  // Using SIDEBAR_COOKIE_NAME from sidebar component does not work due to monorepo and SSR
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <AuthGuard>
        <OrganizationGuard>
            <SidebarProvider defaultOpen={defaultOpen}>
                <DashboardSidebar />
                <main className="flex flex-1 flex-col">
                    <div className="h-12 flex items-center gap-2 px-3 border-b">
                    <SidebarTrigger />
                    <span className="text-sm">Menu</span>
                    </div>
                    {children}
                </main>
            </SidebarProvider>
            
        </OrganizationGuard>
      
    </AuthGuard>
  )
}

export default DashboardLayout
