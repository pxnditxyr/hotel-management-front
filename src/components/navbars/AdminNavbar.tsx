import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react"
import { useAuthStore } from "../../stores"
import { useLocation, useNavigate } from "react-router-dom"

interface IAdminNavbarProps {
  onSignOutClick: () => void
}

export const AdminNavbar = ({ onSignOutClick }: IAdminNavbarProps) => {

  const navigate = useNavigate()

  const user = useAuthStore( state => state.user )
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
          <Link href="/admin/dashboard" color={ isActive('/admin/dashboard') ? 'danger' : 'foreground' }>
            Panel de Control
          </Link>
        </NavbarItem>
        <NavbarItem isActive={ isActive('/admin/categories') }>
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant={ `${ ( isActive( '/admin/categories' ) || isActive( '/admin/categories' ) ) ? 'light' : 'light' }` }
                color={ `${ ( isActive( '/admin/products' ) || isActive( '/admin/categories' ) ) ? 'danger' : 'default' }` }
              >
                Productos
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" color={ `${ ( isActive( '/admin/products' ) || isActive( '/admin/categories' ) ) ? 'danger' : 'default' }` }>
              <DropdownItem key="products"
                onClick={ () => navigate( '/admin/products' ) }
              > Productos </DropdownItem>
              <DropdownItem
                key="categories"
                onClick={ () => navigate( '/admin/categories' ) }
              > Categoria de Productos </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem isActive={ isActive('/admin/customers') }>
          <Link href="/admin/customers" color={ isActive('/admin/customers') ? 'danger' : 'foreground' }>
            Clientes
          </Link>
        </NavbarItem>
        <NavbarItem isActive={ isActive('/admin/departments') }>
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant={ `${ ( isActive( '/admin/departments' ) || isActive( '/admin/floors' ) || isActive( '/admin/department-categories' ) ) ? 'light' : 'light' }` }
                color={ `${ ( isActive( '/admin/departments' ) || isActive( '/admin/floors' ) || isActive( '/admin/department-categories' ) ) ? 'danger' : 'default' }` }
              >
                Departamentos
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" color={ `${ ( isActive( '/admin/departments' ) || isActive( '/admin/floors' ) || isActive( '/admin/department-categories' ) ) ? 'danger' : 'default' }` }>
              <DropdownItem key="departments"
                onClick={ () => navigate( '/admin/departments' ) }
              > Departamentos </DropdownItem>
              <DropdownItem key="departments"
                onClick={ () => navigate( '/admin/floors' ) }
              > Pisos </DropdownItem>
              <DropdownItem
                key="departmentCategories"
                onClick={ () => navigate( '/admin/department-categories' ) }
              > Categoria de Departamentos </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem isActive={ isActive('/admin/employees') }>
          <Link href="/admin/reservations" color={ isActive('/admin/reservations') ? 'danger' : 'foreground' }>
            Reservaciones
          </Link>
        </NavbarItem>
        <NavbarItem isActive={ isActive('/admin/employees') }>
          <Link href="/admin/orders" color={ isActive('/admin/orders') ? 'danger' : 'foreground' }>
            Ordenes
          </Link>
        </NavbarItem>
        <NavbarItem isActive={ isActive('/admin/employees') }>
          <Link href="/admin/reports" color={ isActive('/admin/reports') ? 'danger' : 'foreground' }>
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
