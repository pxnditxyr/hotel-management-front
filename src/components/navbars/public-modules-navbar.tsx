import { useLocation } from 'react-router-dom'
import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'

export const PublicModulesNavbar = () => {
  const location = useLocation()
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit"> Torre Nairobi </p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={ location.pathname === '/' }>
          <Link href="/" color={ location.pathname === '/' ? 'danger' : 'foreground' } aria-current={ location.pathname === '/' && 'page' }>
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem isActive={ location.pathname === '/apartments' }>
          <Link href="/apartments" color={ location.pathname === '/apartments' ? 'danger' : 'foreground' } aria-current={ location.pathname === '/apartments' && 'page' }>
            Departamentos
          </Link>
        </NavbarItem>
        <NavbarItem isActive={ location.pathname === '/reservations' }>
          <Link href="/reservations" color={ location.pathname === '/reservations' ? 'danger' : 'foreground' } aria-current={ location.pathname === '/reservations' && 'page' }>
            Reservaciones
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={ Link }
            color="primary"
            href="/auth/signin"
            variant="flat">
            Iniciar sesión
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
