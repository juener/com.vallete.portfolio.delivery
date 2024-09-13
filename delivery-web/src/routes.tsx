import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './pages/_layout/app'
import { Register } from './pages/auth/register'
import { AuthLayout } from './pages/_layout/auth'
import { Dashboard } from './pages/app/dashboard'
import { Login } from './pages/auth/login'
import { Orders } from './pages/app/orders'
import { NotFound } from './pages/default/not-found'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/orders', element: <Orders /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
    ],
  },
])
