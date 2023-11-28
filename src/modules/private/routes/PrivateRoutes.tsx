import { Navigate, Route, Routes } from 'react-router-dom'

import { useAuthStore } from '../../../stores'
import { AdminRoutes } from '../../admin'
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import { LoadingPage } from '../../../ui/pages'
import { Reservations } from '../../../reservations/pages'
import { Apartments } from '../../../apartments/pages'
import { ReservationView } from '../../../reservations/pages/ReservationView'

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
                      <Route path="reservations" element={ <Reservations /> } />
                      <Route path="apartments" element={ <Apartments /> } />
                      <Route path="reservations/:id" element={ <ReservationView /> } />
                    </Routes>
<Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit"> Torre Nairobi </p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/users">
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/user/apartments" color="foreground">
            Departamentos
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/user/reservations" aria-current="page">
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
        <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="danger"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold"> Bienvenido </p>
              <p className="font-semibold"> { user?.username } </p>
            </DropdownItem>
            <DropdownItem key="team_settings"> Nombre: { user?.name } </DropdownItem>
            <DropdownItem key="settings"> Rol: Administrador </DropdownItem>
            <DropdownItem key="analytics"> Correo: { user?.email } </DropdownItem>
            <DropdownItem key="configurations"> Configuraciones </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              onClick={ signout }
            >
              Cerrar Sesion
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
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
              <Route path="*" element={ <Navigate to="/user" /> } />
            </>
          )
        }
      </Routes>
    </div>
  )
}
