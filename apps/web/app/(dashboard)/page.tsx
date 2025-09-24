'use client'
import { Authenticated, Unauthenticated } from "convex/react";
import { OrganizationSwitcher, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@workspace/ui/components/button"
import { api } from "@workspace/backend/_generated/api"
import { useMutation, useQuery } from "convex/react";
export default function Page() {
   const users = useQuery(api.users.getmany);
   const addUser = useMutation(api.users.addUser);
  return (
     <>
     
       <UserButton />
       <OrganizationSwitcher hidePersonal />
      <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Button size="sm" onClick={() => addUser()}>Add User</Button>
       {JSON.stringify(users)}
      </div>
    </div>
     
     </>
    
  )
}
