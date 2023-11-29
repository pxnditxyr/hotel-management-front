import { Routes, Route } from 'react-router-dom'
import { PublicRoutes } from '../modules/public'
import { useAuthStore } from '../stores'
import { Spinner } from '@nextui-org/react'
import { PrivateRoutes } from '../modules/private'

export const AppRouter = () => {

  const authStatus = useAuthStore( state => state.status )
  const checkAuthStatus = useAuthStore( state => state.checkAuthStatus )

  if ( authStatus === 'pending' ) {
    checkAuthStatus()
    return ( <Spinner label="Loading..." color="warning" /> )
  }

  return (
    <Routes>
      {
        ( authStatus === 'unauthenticated' )
          ? (
            <Route path="/*" element={ <PublicRoutes /> } />
          )
          : (
            <Route path="/*" element={ <PrivateRoutes /> } />
          )
      }
    </Routes>
  )
}
