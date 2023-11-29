import { Navigate, Route, Routes } from 'react-router-dom'

import { useAuthStore } from '../../../stores'
import { AdminRoutes } from '../../admin'
import { LoadingPage } from '../../../ui/pages'
import { UserRoutes } from '../../user'

export const PrivateRoutes = () => {


  const user = useAuthStore( state => state.user )
  const status = useAuthStore( state => state.status )
  if ( status === 'pending' ) return ( <LoadingPage/> )

  return (
    <div>
      <Routes>
        {
          ( user?.role === 'admin' ) ?(
            <>
              <Route path="admin/*" element={ <AdminRoutes /> } />
              <Route path="*" element={ <Navigate to="/admin/*" /> } />
            </>
          ) : (
            <>
              <Route path="user/*" element={ <UserRoutes /> } />
              <Route path="*" element={ <Navigate to="/user" /> } />
            </>
          )
        }
      </Routes>
    </div>
  )
}
