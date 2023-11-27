import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CrudTable, PlusButton } from '../../../../components'
import { useCustomersStore } from '../../../../stores'
import { LoadingPage } from '../../../../ui/pages'

import Swal from 'sweetalert2'

const columns = [
  { name: 'Nombre', uid: 'name' },
  { name: 'Apellido', uid: 'lastname' },
  { name: 'DNI', uid: 'dni' },
  { name: 'Estado', uid: 'isActive' },
  { name: 'Fecha de creacion', uid: 'createdAt' },
  { name: 'Acciones', uid: 'actions' }
]

export const CustomersPage = () => {
  const findAll = useCustomersStore( state => state.findAll )
  const customers = useCustomersStore( state => state.customers )
  const isLoading = useCustomersStore( state => state.isLoading )
  const toggleStatus = useCustomersStore( state => state.toggleStatus )
  const error = useCustomersStore( state => state.error )
  const clearError = useCustomersStore( state => state.clearError )
  const navigate = useNavigate()

  useEffect( () => {
    findAll()
  }, [] )

  useEffect( () => {
    console.log( error )
    if ( error ) {
      Swal.fire({
        title: 'Error',
        text: error,
        icon: 'error'
      })
    }
    clearError()
  }, [ error, clearError ] )

  if ( isLoading ) return ( <LoadingPage /> )

  const onAddNewClick = () => navigate( '/admin/customers/create' )
  const onEditClick = ( id: string ) => navigate( `/admin/customers/edit/${ id }` )
  const onViewClick = ( id: string ) => navigate( `/admin/customers/view/${ id }` )

  const onToggleStatusClick = ( id: string ) => {
    toggleStatus( id )
  }

  return (
    <div>
      <div className="p-4 flex flex-col gap-16 justify-center items-center">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold"> Lista de Clientes </h1>
        </div>
        <div className="flex justify-end">
          <PlusButton onClick={ onAddNewClick } />
        </div>
        <div className="flex justify-center items-center px-8">
          <CrudTable
            columns={ columns }
            data={ customers }
            onClickEdit={ onEditClick }
            onClickView={ onViewClick }
            onToggleStatus={ onToggleStatusClick }
            showViewButton={ false }
          />
        </div>
      </div>
    </div>
  )
}
