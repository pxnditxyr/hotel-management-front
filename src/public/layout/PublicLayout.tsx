import { CSSProperties } from 'react'
import { Navbar } from '../../ui'

interface IProps {
  title: string
  children: JSX.Element | JSX.Element[]
  style?: CSSProperties
  titleClassName?: string
  navClassName?: string
  ulClassName?: string
  linkClassName?: string
  buttonClassName?: string
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
]

export const PublicLayout = ( { children, title, style, titleClassName, navClassName, ulClassName, linkClassName, buttonClassName }: IProps ) => {

  return (
    <div className="public-layout" style={ style }>
      <Navbar links={ links } navClassName={ navClassName } ulClassName={ ulClassName } linkClassName={ linkClassName } buttonClassName={ buttonClassName } />
      <div className="relative overflow-hidden mt-6">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-700 to-rose-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-12 sm:px-6 sm:py-12 lg:px-8">
          <h1 className={ `text-4xl font-extrabold text-white ${ titleClassName }` }>
            { title }
          </h1>
        </div>
      </div>
      <div className="public-layout__content">
        { children }
      </div>
    </div>
  )
}
  
