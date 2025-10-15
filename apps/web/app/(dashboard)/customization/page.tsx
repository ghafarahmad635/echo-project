import { Button } from '@workspace/ui/components/button'
import React from 'react'

const page = () => {
  return (
    <div className="flex items-center justify-center min-h-svh ">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">Hello World</h1>
          <Button size="sm">Add User</Button>
        
        </div>
    </div>
  )
}

export default page
