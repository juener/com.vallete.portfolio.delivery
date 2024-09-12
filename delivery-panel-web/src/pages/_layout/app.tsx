import { Header } from '@/components/header'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col w-screen">
      <Header />
      <div className="flex flex-1">
        <Outlet />
      </div>
      <div className="bg-yellow-700">aoisd jfo</div>
    </div>
  )
}
