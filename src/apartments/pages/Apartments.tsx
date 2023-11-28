import { Button, DropdownItem, DropdownMenu, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import { useAuthStore } from '../../stores'
import { LoadingPage } from '../../ui/pages'

export const Apartments = () => {
  const user = useAuthStore( state => state.user )
  const status = useAuthStore( state => state.status )
  const signout = useAuthStore( state => state.signout )
  if ( status === 'pending' ) return ( <LoadingPage/> )

  return (
    <>
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit"> Torre Nairobi </p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/apartments" aria-current="page">
            Departamentos
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="reservations">
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

    <div className="w-full min-h-screen bg-gray-800">
      <h1 className="text-center text-4xl font-bold text-white"> Torre Nairobi </h1>
        <h2>
          Nuestros departamentos son los mejores
        </h2>
    </div>
    </>
  )
  // return (
  //   <ApartmentsLayout title="Departamentos">
  //     <div className="flex flex-col gap-4">
  //       {/* <p className="text-center text-2xl font-bold"> */}
  //       {/*   ver Departamentos */}
  //       {/* </p> */}
  //       {/* <p className="text-center text-2xl font-bold"> */}
  //       {/*   reservar Departamento */}
  //       {/* </p> */}
  //       {/* <p className="text-center text-2xl font-bold"> */}
  //       {/*   ver reservas */}
  //       {/* </p> */}
  //       {/* <p className="text-center text-2xl font-bold"> */}
  //       {/*   comprar Departamento */}
  //       {/* </p> */}
  //       <div>
  //
  //       </div>
  //     </div>
  //   </ApartmentsLayout>
  // )
}
