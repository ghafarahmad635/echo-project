'use client'

import { useVapi } from "@/modules/widget/hooks/use-vapi";
import { Button } from "@workspace/ui/components/button"

export default function Page() {
  const { isConnected, isConnecting, isSpeaking, transcript, startCall, endCall } = useVapi();

  return (
    <div className="flex items-center justify-center min-h-svh">
      <Button size="sm" onClick={startCall}>Start Call</Button>
      <Button size="sm" onClick={endCall}>End Call</Button>
      <div>
        {isConnecting && <p>Connecting...</p>}
        {isConnected && <p>Connected</p>}
        {isSpeaking && <p>Speaking...</p>}
        </div>
        {JSON.stringify(transcript)}
    </div>
  )
}
