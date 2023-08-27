import { Link } from 'react-router-dom'
import { INavbarLinks } from '../../interfaces'


interface IProps {
  links: INavbarLinks[]
}

export const Navbar = ( { links } : IProps ) => {

  return (
    <nav>
      <div>
        <ul>
          {
            links.map( ({ name, path, image }) => {
              return (
                <li key={ name }>
                  <Link to={ path }> { ( image ) ? image : name } </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    </nav>
  )
}
