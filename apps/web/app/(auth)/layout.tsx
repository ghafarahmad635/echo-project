import React from 'react'
interface Props{
    children:React.ReactNode
}
const layout = ({children}:Props) => {
  return (
    <div className='flex min-h-screen items-center justify-center flex-col gap-4'>
      {children}
    </div>
  )
}

export default layout
