import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

export function AuthLayout(){
  return(
    <>
      <div className="grid grid-cols-12 h-screen w-screen">
        <div className="col-span-8 bg-primary text-secondary hidden sm:flex flex-col justify-center p-4 gap-2">
          <p className="font-bold text-6xl">Hi there,</p>
          <span className="font-medium text-2xl">welcome to your delivery panel.</span>
        </div>
        <div className="col-span-12 sm:col-span-4 bg-background text-foreground p-4 flex flex-col justify-center items-center">
          <img src="/logo.svg" />
          <Toaster />
          <Outlet />
        </div>
      </div>
    </>
  )
}