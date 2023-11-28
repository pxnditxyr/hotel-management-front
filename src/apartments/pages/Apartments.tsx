import { Avatar, Button, Card, CardBody, CardHeader, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import { useAuthStore, useProductsStore } from '../../stores'
import { LoadingPage } from '../../ui/pages'
import { useEffect } from 'react'

export const Apartments = () => {
  const user = useAuthStore( state => state.user )
  const status = useAuthStore( state => state.status )
  const signout = useAuthStore( state => state.signout )
  const products = useProductsStore( state => state.products )
  const findAllProdcuts = useProductsStore( state => state.findAll )

  if ( status === 'pending' ) return ( <LoadingPage/> )
  useEffect( () => {
    findAllProdcuts()
  }, [] )

  return (
    <>
      {
        ( status === 'unauthenticated' ) ? (
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
    ) : (
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
        <NavbarItem isActive>
          <Link href="/user/apartments" aria-current="page">
            Departamentos
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/user/reservations" color="foreground">
            Reservaciones
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
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
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    )
      }

    <div className="w-full min-h-screen bg-gray-800 flex flex-col items-center p-4">
      <h1 className="text-center text-4xl font-bold text-white"> Torre Nairobi </h1>
      <h2> Nuestros departamentos son los mejores </h2>
      <h3> Aqui tienes una lista de nuestros productos </h3>
      <div className="flex flex-wrap gap-4">
        <div className="w-full flex flex-col items-center gap-4">
          <div className="bg-white rounded-lg shadow-lg p-4 w-full flex flex-wrap gap-8">
            { products.filter( a => a.isActive ).map( product => (
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold"> { product.name } </p>
          <small className="text-default-500"> Cantidad: { product.stock } </small>
          <h4 className="font-bold text-large"> Price: { product.price } </h4>
          <h4 className="font-bold text-large"> Description: { product.category?.name } </h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl w-full"
            src={ product.imageUrl }
          />
        </CardBody>
      </Card>
            ) ) }
          </div>
        </div>
      </div>
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
