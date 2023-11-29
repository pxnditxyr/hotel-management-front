import { useEffect } from 'react'
import { CrudTable } from '../../../../components'
import { useContactUsStore } from '../../../../stores'
import { useNavigate } from 'react-router-dom'
import { LoadingPage } from '../../../../ui/pages'

const columns = [
  { name: 'Nombre', uid: 'name' },
  { name: 'Email', uid: 'email' },
  { name: 'Mensaje', uid: 'message' },
  { name: 'Estado', uid: 'isActive' },
  { name: 'Fecha de creacion', uid: 'createdAt' },
  { name: 'Fecha de actualizacion', uid: 'updatedAt' },
  { name: 'Acciones', uid: 'actions' }
]

export const ContactsPage = () => {
  const findAll = useContactUsStore( state => state.findAll )
  const contactUsess = useContactUsStore( state => state.contactUsess )
  const isLoading = useContactUsStore( state => state.isLoading )
  const navigate = useNavigate()

  useEffect( () => {
    findAll()
  }, [] )

  if ( isLoading ) return ( <LoadingPage /> )

  const onViewClick = ( id: string ) => navigate( `/admin/products/view/${ id }` )

  return (
    <div>
      <div className="p-4 flex flex-col gap-16 justify-center items-center">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold"> Lista de Contactos </h1>
        </div>
        <div className="flex justify-center items-center px-8">
          <CrudTable
            columns={ columns }
            data={ contactUsess }
            onClickEdit={ () => {} }
            onClickView={ onViewClick }
            onToggleStatus={ () => {} }
            showViewButton={ false }
          />
        </div>
      </div>
    </div>
  )
}
