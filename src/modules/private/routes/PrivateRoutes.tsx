import { Navigate, Route, Routes } from 'react-router-dom'

import { useAuthStore } from '../../../stores'
import { AdminRoutes } from '../../admin'

export const PrivateRoutes = () => {

  const user = useAuthStore( state => state.user )
  const signout = useAuthStore( state => state.signout )

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
              <Route path="/user/*" element={ 
                  <>
                    <h1>USER</h1>
                    <button>
                      <span onClick={ () => signout() }>Signout</span>
                    </button>
                  </>
                } />
              <Route path="*" element={ <Navigate to="/user/*" /> } />
            </>
          )
        }
      </Routes>
    </div>
  )
}
