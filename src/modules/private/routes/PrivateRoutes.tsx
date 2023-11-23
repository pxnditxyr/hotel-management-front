import { Navigate, Route, Routes } from 'react-router-dom'

import { useAuthStore } from '../../../stores'
import { AdminRoutes } from '../../admin'

export const PrivateRoutes = () => {

  const user = useAuthStore( state => state.user )

  return (
    <div>
      <Routes>
        {
          ( user?.role === 'admin' ) ?(
            <>
              <Route path="/admin/*" element={ <AdminRoutes /> } />
              <Route path="*" element={ <Navigate to="/admin/*" /> } />
            </>
          ) : (
            <>
              <Route path="/user/*" element={ <h1> errorr <pre> { JSON.stringify( user, null, 2)} </pre> </h1> } />
              <Route path="*" element={ <Navigate to="/user/*" /> } />
            </>
          )
        }
      </Routes>
    </div>
  )
}
