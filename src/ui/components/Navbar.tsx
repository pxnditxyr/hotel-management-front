import { Link } from 'react-router-dom'
import { INavbarLinks } from '../../interfaces'


interface IProps {
  links: INavbarLinks[]
  navClassName?: string
  ulClassName?: string
  linkClassName?: string
  buttonClassName?: string
}

export const Navbar = ( { links, navClassName, ulClassName, linkClassName, buttonClassName }: IProps ) => {

  return (
    <nav className={ `navbar ${ navClassName }` }>
      <ul className={ `navbar__list ${ ulClassName }` }>
        {
          links.map( ({ name, path, image }) => {
            return (
              <li key={ name }>
                <Link to={ path } className={ `navbar__item ${ linkClassName }` }> { ( image ) ? image : name } </Link>
              </li>
            )
          })
        }
      </ul>
      <ul className="navbar__right">
        <li className="flex">
          <Link 
            className={ `px-4 py-2 rounded-xl bg-sky-500 text-white font-bold ${ buttonClassName }` }
            to="/auth/signin"> Iniciar sesión </Link>
        </li>
      </ul>
    </nav>
  )
}
