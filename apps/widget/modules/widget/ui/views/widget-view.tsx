import React from 'react'
import WidgetFooter from '../components/widget-footer'
import { WidgetHeader } from '../components/widget-header'
import WidgetAuthScreen from '../screens/widget-auth-screen'
interface Props{
    orgId: string
}
const WidgetView = ({orgId}:Props) => {
  return (
     <main className=" min-h-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
     
     
      <WidgetAuthScreen/>
      
    </main>
  )
}

export default WidgetView
