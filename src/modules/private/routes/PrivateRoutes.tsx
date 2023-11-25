import { Navigate, Route, Routes } from 'react-router-dom'

import { useAuthStore } from '../../../stores'
import { AdminRoutes } from '../../admin'
import { Button } from '@nextui-org/react'

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
                  <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                    <h1 className="text-2xl font-bold text-center text-gray-700" > Bienvenido { user?.name } </h1>
                    <h2 className="text-xl font-bold text-center text-gray-700" > Email: { user?.email } </h2>
                    <h3 className="text-lg font-bold text-center text-gray-700" > Tu Rol: { user?.role } </h3>
                    <Button color="danger" onClick={ () => signout() }>
                      Cerrar sesión
                    </Button>  
                  </div>
                } />
              <Route path="*" element={ <Navigate to="/user/*" /> } />
            </>
          )
        }
      </Routes>
    </div>
  )
}
