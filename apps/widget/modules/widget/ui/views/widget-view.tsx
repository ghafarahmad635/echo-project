import React from 'react'
import WidgetFooter from '../components/widget-footer'
import { WidgetHeader } from '../components/widget-header'
interface Props{
    orgId: string
}
const WidgetView = ({orgId}:Props) => {
  return (
     <main className=" min-h-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
     
      <WidgetHeader>
         <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
          <p className="text-3xl">
            Hi there! 👋
          </p>
          <p className="text-lg">
            Let&apos;s get you started
          </p>
        </div>
      </WidgetHeader>
       WidgetView {orgId}
      <WidgetFooter/>
    </main>
  )
}

export default WidgetView
