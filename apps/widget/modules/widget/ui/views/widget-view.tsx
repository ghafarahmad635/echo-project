import React from 'react'

import WidgetAuthScreen from '../screens/widget-auth-screen'
import { useAtom } from 'jotai'
import { screenAtom } from '../../atoms/widget-atoms'
interface Props{
    orgId: string
}
const WidgetView = ({orgId}:Props) => {
  const screen = useAtom(screenAtom)[0]
  const screenComponents={
    auth:<WidgetAuthScreen/>,
    loading:<p>Todo loading</p>,
    error:<p>Todo error</p>,
    voice:<p>Todo voice</p>,
    inbox:<p>Todo inbox</p>,
    selection:<p>Todo selection</p>,
    chat:<p>Todo chat</p>,
    contact:<p>Todo contact</p>,
  }
  return (
     <main className=" min-h-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
     
     {screenComponents[screen]}
      
    </main>
  )
}

export default WidgetView
