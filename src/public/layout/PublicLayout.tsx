import { Navbar } from '../../ui'

interface IProps {
  title: string
  children: JSX.Element | JSX.Element[]
}

const links = [
  {
    name: "Inicio",
    path: "/"
  },
  {
    name: "Reservaciones",
    path: "/reservations"
  },
  {
    name: "Departamentos",
    path: "/apartments"
  },
  {
    name: "Acerca de nosotros",
    path: "/about"
  },
  {
    name: "Contactanos",
    path: "/contact"
  },
  {
    name: "Iniciar sesión",
    path: "/auth/signin"
  },
]

export const PublicLayout = ( { children, title } : IProps ) => {

  return (
    <div>
      <Navbar links={ links } />
      <h1>{ title }</h1>
      <div>
        { children }
      </div>
    </div>
  )
}
  
