import { useLocation } from 'react-router-dom'
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import { useAuthStore } from '../../stores'

export const PrivateModulesNavbar = () => {
  const location = useLocation()
  const user = useAuthStore( state => state.user )
  const onSignoutClick = useAuthStore( state => state.signout )
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit"> Torre Nairobi </p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={ location.pathname === '/user' }>
          <Link href="/" color={ location.pathname === '/user' ? 'danger' : 'foreground' } aria-current={ location.pathname === '/user' && 'page' }>
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem isActive={ location.pathname === '/users/apartments' }>
          <Link href="/user/apartments" color={ location.pathname === '/user/apartments' ? 'danger' : 'foreground' } aria-current={ location.pathname === '/user/apartments' && 'page' }>
            Departamentos
          </Link>
        </NavbarItem>
        <NavbarItem isActive={ location.pathname === '/reservations' }>
          <Link href="/user/reservations" color={ location.pathname === '/user/reservations' ? 'danger' : 'foreground' } aria-current={ location.pathname === '/user/reservations' && 'page' }>
            Reservaciones
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
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
              onClick={ onSignoutClick }
            >
              Cerrar Sesion
            </DropdownItem>
          </DropdownMenu>
        </Dropdown> 
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
