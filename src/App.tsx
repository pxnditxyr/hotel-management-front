import { useNavigate } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'

import { AppRouter } from './router'

import './styles.css'

export const App = () => {

  const navigate = useNavigate()

  return (
    <NextUIProvider navigate={ navigate }>
      <main className="dark text-foreground bg-background">
        <AppRouter />
      </main>
    </NextUIProvider>
  )
}
