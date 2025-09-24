
interface Props{
    children:React.ReactNode
}
export const AuthLayout = ({children}:Props) => {
  return (
    <div className='flex min-h-screen items-center justify-center flex-col gap-4'>
      {children}
    </div>
  )
}

export default AuthLayout
