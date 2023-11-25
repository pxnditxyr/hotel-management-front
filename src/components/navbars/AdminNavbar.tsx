import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react"
import { useAuthStore } from "../../stores"
import { useLocation } from "react-router-dom"

interface IAdminNavbarProps {
  onSignOutClick: () => void
}

export const AdminNavbar = ({ onSignOutClick }: IAdminNavbarProps) => {

  const user = useAuthStore( state => state.user )
  // get current path to set aria-current="page" in the navbar
  const { pathname } = useLocation()

  const isActive = ( path: string ) => {
    return pathname === path
  }

  return (
    <Navbar maxWidth="full">
      <NavbarBrand>
        <p className="font-bold text-inherit"> Torre Nairobi </p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={ isActive('/admin/dashboard') }>
          <Link href="/admin/dashboard" color={ isActive('/admin/dashboard') ? 'secondary' : 'foreground' }>
            Panel de Control
          </Link>
        </NavbarItem>
        <NavbarItem isActive={ isActive('/admin/categories') }>
          <Link href="/admin/categories" color={ isActive('/admin/categories') ? 'secondary' : 'foreground' }>
            Categorias
          </Link>
        </NavbarItem>
        <NavbarItem isActive={ isActive('/admin/customers') }>
          <Link href="/admin/customers" color={ isActive('/admin/customers') ? 'secondary' : 'foreground' }>
            Clientes
          </Link>
        </NavbarItem>
        <NavbarItem isActive={ isActive('/admin/products') }>
          <Link href="/admin/products" color={ isActive('/admin/products') ? 'secondary' : 'foreground' }>
            Productos
          </Link>
        </NavbarItem>
        <NavbarItem isActive={ isActive('/admin/departments') }>
          <Link href="/admin/departments" color={ isActive('/admin/departments') ? 'secondary' : 'foreground' }>
            Departamentos
          </Link>
        </NavbarItem>
        <NavbarItem isActive={ isActive('/admin/employees') }>
          <Link href="/admin/floors" color={ isActive('/admin/floors') ? 'secondary' : 'foreground' }>
            Pisos
          </Link>
        </NavbarItem>
        <NavbarItem isActive={ isActive('/admin/employees') }>
          <Link href="/admin/reservations" color={ isActive('/admin/reservations') ? 'secondary' : 'foreground' }>
            Reservaciones
          </Link>
        </NavbarItem>
        <NavbarItem isActive={ isActive('/admin/employees') }>
          <Link href="/admin/orders" color={ isActive('/admin/orders') ? 'secondary' : 'foreground' }>
            Ordenes
          </Link>
        </NavbarItem>
        <NavbarItem isActive={ isActive('/admin/employees') }>
          <Link href="/admin/reports" color={ isActive('/admin/reports') ? 'secondary' : 'foreground' }>
            Reportes
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
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
              onClick={ onSignOutClick }
            >
              Cerrar Sesion
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  )
}
