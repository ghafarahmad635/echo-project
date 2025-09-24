'use client'

import { Button } from "@workspace/ui/components/button"
import { api } from "@workspace/backend/_generated/api"
import { useMutation, useQuery } from "convex/react";
export default function Page() {
   const users = useQuery(api.users.getmany);
   const addUser = useMutation(api.users.addUser);
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Button onClick={() => addUser()} size="sm">Button</Button>
       {JSON.stringify(users)}
      </div>
    </div>
  )
}
