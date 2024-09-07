import { RouterProvider } from 'react-router-dom'
import './global.css'
import { router } from './routes'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './components/theme/theme-provider'

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="delivery-panel-theme" defaultTheme="system">
        <Helmet titleTemplate="%s | Delivery Panel Web" />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  )
}
