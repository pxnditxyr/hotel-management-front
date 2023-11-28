import { Button, DropdownItem, DropdownMenu, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react"
import { useAuthStore, useDepartmentsStore } from "../../stores"
import { LoadingPage } from "../../ui/pages"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const Reservations = () => {

  const user = useAuthStore( state => state.user )
  const status = useAuthStore( state => state.status )
  const signout = useAuthStore( state => state.signout )
  const departments = useDepartmentsStore( state => state.departments )
  const findAllDepartments = useDepartmentsStore( state => state.findAll )
  useEffect( () => {
    findAllDepartments()
  }, [] )

  if ( status === 'pending' ) return ( <LoadingPage /> )
  const navigate = useNavigate()


  return (
    <div>
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
      <div className="flex items-center h-screen flex-col gap-4 p-8">
        <h1 className="text-4xl font-bold"> Reservations </h1>
        <div className="flex flex-wrap gap-4">
          {
            departments.filter( a => a.isActive ).map( department => (
              <div className="flex flex-col gap-4" key={ department.id } onClick={ () => navigate( `/reservations/${ department.id }` ) }>
                <div key={ department.id } className="w-64 h-64 bg-gray-500 rounded-lg"
                  style={ {
                    background: `url(${ department.imageUrl })`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  } }
                > </div>
                <div className="w-64 h-64 rounded-lg">
                  <h1 className="text-2xl font-bold"> { department.name } </h1>
                  <p className="text-xl font-semibold"> { department.detail } </p>
                  <p className="text-xl font-semibold"> { department.floor?.name } </p>
                </div>
                {
                  status === 'authenticated' ? (
                    <Button color="success" onClick={ () => navigate( `/reservations/${ department.id }` ) }>
                      Reservar
                    </Button>
                  ) : (
                    <Button color="success" onClick={ () => navigate( `/auth/signin` ) }>
                      Reservar
                    </Button>
                  )
                }
              </div>
            ) )
              
          }
        </div>
      </div>
    </div>
  )
}
