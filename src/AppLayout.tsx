import { NextUIProvider } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

interface IAppLayoutProps {
  children: JSX.Element | JSX.Element[]
}

export const AppLayout = ( { children } : IAppLayoutProps ) => {

  const navigate = useNavigate()

  return (
    <NextUIProvider navigate={ navigate }>
      { children }
    </NextUIProvider>
  )
}
