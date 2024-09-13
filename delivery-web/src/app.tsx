import { RouterProvider } from 'react-router-dom'
import './global.css'
import { router } from './routes'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './components/theme/theme-provider'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="delivery-panel-theme" defaultTheme="system">
        <Helmet titleTemplate="%s | Delivery Panel Web" />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
