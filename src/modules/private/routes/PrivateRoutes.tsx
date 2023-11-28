import { Navigate, Route, Routes } from 'react-router-dom'

import { useAuthStore } from '../../../stores'
import { AdminRoutes } from '../../admin'
import { Button, DropdownItem, DropdownMenu, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import { ReservationsRoutes } from '../../../reservations'
import { LoadingPage } from '../../../ui/pages'

export const PrivateRoutes = () => {


  const user = useAuthStore( state => state.user )
  const status = useAuthStore( state => state.status )
  const signout = useAuthStore( state => state.signout )
  if ( status === 'pending' ) return ( <LoadingPage/> )

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
                  <div>
                    <Routes>
                      <Route path="/user/dashboard" element={ <h1> Dashboard </h1> } />
                      <Route path="/user/profile" element={ <h1> Profile </h1> } />
                      <Route path="/reservations/*" element={ <ReservationsRoutes /> } />

                    </Routes>
<Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit"> Torre Nairobi </p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/apartments" color="foreground">
            Departamentos
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/reservations" aria-current="page">
            Reservaciones
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {
            ( status === 'unauthenticated' ) ? (
              <Button
                  as={ Link }
                  color="primary"
                  href="/auth/signin"
                  variant="flat">
                Iniciar sesión
              </Button>
            ) : (
                  <>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                      <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-semibold"> Bienvenido { user?.name } </p>
                        <p className="font-semibold"> { user?.email } </p>
                      </DropdownItem>
                      <DropdownItem key="configurations">Configurations</DropdownItem>
                      <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                      <DropdownItem key="logout" color="danger" onClick={ signout }>
                        Cerrar sesión
                      </DropdownItem>
                    </DropdownMenu>
                  </>
            )
          }
        </NavbarItem>
      </NavbarContent>
    </Navbar>
                    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                      <h1 className="text-2xl font-bold text-center text-gray-700" > Bienvenido { user?.name } </h1>
                      <h2 className="text-xl font-bold text-center text-gray-700" > Email: { user?.email } </h2>
                      <h3 className="text-lg font-bold text-center text-gray-700" > Tu Rol: { user?.role } </h3>
                      <Button color="danger" onClick={ () => signout() }>
                        Cerrar sesión
                      </Button>  
                    </div>
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
