import { Button, DropdownItem, DropdownMenu, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react"
import { useAuthStore, useDepartmentsStore } from "../../stores"
import { LoadingPage, UnexpectedError } from "../../ui/pages"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export const ReservationView = () => {

  const id = useLocation().pathname.split( '/' ).pop() as string
  const user = useAuthStore( state => state.user )
  const status = useAuthStore( state => state.status )
  const signout = useAuthStore( state => state.signout )
  const department = useDepartmentsStore( state => state.department )
  const findOneDepartment = useDepartmentsStore( state => state.findOne )
  const isLoadingDepartment = useDepartmentsStore( state => state.isLoading )
  useEffect( () => {
    findOneDepartment( id )
  }, [] )

  if ( status === 'pending' ) return ( <LoadingPage /> )
  if ( isLoadingDepartment ) return ( <LoadingPage /> )
  if ( !department ) return ( <UnexpectedError /> )


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
            // departments.map( department => (
            //   <div className="flex flex-col gap-4" key={ department.id } onClick={ () => navigate( `/reservations/${ department.id }` ) }>
            //     <div key={ department.id } className="w-64 h-64 bg-gray-500 rounded-lg"
            //       style={ {
            //         background: `url(${ department.imageUrl })`,
            //         backgroundSize: 'cover',
            //         backgroundPosition: 'center'
            //       } }
            //     > </div>
            //     <div className="w-64 h-64 rounded-lg">
            //       <h1 className="text-2xl font-bold"> { department.name } </h1>
            //       <p className="text-xl font-semibold"> { department.detail } </p>
            //       <p className="text-xl font-semibold"> { department.floor?.name } </p>
            //     </div>
            //   </div>
            // ) )
            <div className="flex flex-col gap-4">
              <div className="w-64 h-64 bg-gray-500 rounded-lg"
                style={ {
                  background: `url(${ department.imageUrl })`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                } }
              > </div>
              <div className="w-64 h-64 rounded-lg">
                <h1 className="text-2xl font-bold"> { department.name } </h1>
                <p className="text-xl font-semibold"> Detalles: { department.detail } </p>
                <p className="text-xl font-semibold"> Piso: { department.floor?.name } </p>
                <p className="text-xl font-semibold"> Numero de Piso: { department.floor?.number } </p>
                <p className="text-xl font-semibold"> Categoria: { department.departmentCategory?.name } </p>
              </div>
            </div>
              
          }
        </div>
      </div>
    </div>
  )
}
