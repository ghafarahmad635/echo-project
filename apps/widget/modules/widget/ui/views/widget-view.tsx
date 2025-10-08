import React from 'react'

import WidgetAuthScreen from '../screens/widget-auth-screen'
import { useAtom } from 'jotai'
import { screenAtom } from '../../atoms/widget-atoms'
import { WidgetErrorScreen } from '../screens/widget-error-screen'
import WidgetLoadingScreen from '../screens/widget-loading-screen'
import { WidgetSelectionScreen } from '../screens/widget-selection-screen'
import { WidgetChatScreen } from '../screens/widget-chat-screen'
interface Props{
    organizationId: string
}
const WidgetView = ({organizationId}:Props) => {
  const screen = useAtom(screenAtom)[0]
  const screenComponents={
    auth:<WidgetAuthScreen/>,
    loading:<WidgetLoadingScreen organizationId={organizationId} />,
    error:<WidgetErrorScreen/>,
    voice:<p>Todo voice</p>,
    inbox:<p>Todo inbox</p>,
    selection:<WidgetSelectionScreen />,
    chat:<WidgetChatScreen />,
    contact:<p>Todo contact</p>,
  }
  return (
     <main className=" min-h-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
     
     {screenComponents[screen]}
      
    </main>
  )
}

export default WidgetView
