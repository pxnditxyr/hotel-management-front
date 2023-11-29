import { useEffect } from 'react'
import { CrudTable, PlusButton } from '../../../../components'
import { useFloorsStore } from '../../../../stores'
import { useNavigate } from 'react-router-dom'
import { LoadingPage } from '../../../../ui/pages'
import Swal from 'sweetalert2'

const columns = [
  { name: 'Nombre del piso', uid: 'name' },
  { name: 'Numero', uid: 'number' },
  { name: 'Estado', uid: 'isActive' },
  { name: 'Fecha de creacion', uid: 'createdAt' },
  { name: 'Fecha de actualizacion', uid: 'updatedAt' },
  { name: 'Acciones', uid: 'actions' }
]

export const FloorsPage = () => {
  const findAll = useFloorsStore( state => state.findAll )
  const floors = useFloorsStore( state => state.floors )
  const isLoading = useFloorsStore( state => state.isLoading )
  const toggleStatus = useFloorsStore( state => state.toggleStatus )
  const error = useFloorsStore( state => state.error )
  const clearError = useFloorsStore( state => state.clearError )
  const navigate = useNavigate()

  useEffect( () => {
    findAll()
  }, [] )

  useEffect( () => {
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

  const onAddNewClick = () => navigate( '/admin/floors/create' )
  const onEditClick = ( id: string ) => navigate( `/admin/floors/edit/${ id }` )
  const onViewClick = ( id: string ) => navigate( `/admin/floors/view/${ id }` )

  const onToggleStatusClick = ( id: string ) => {
    toggleStatus( id )
  }

  return (
    <div>
      <div className="p-4 flex flex-col gap-16 justify-center items-center">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold"> Lista de Pisos </h1>
        </div>
        <div className="flex justify-end">
          <PlusButton onClick={ onAddNewClick } />
        </div>
        <div className="flex justify-center items-center px-8">
          <CrudTable
            columns={ columns }
            data={ floors }
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
