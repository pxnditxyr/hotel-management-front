import { useEffect } from 'react'
import { CrudTable, PlusButton } from '../../../../components'
import { useDepartmentsStore } from '../../../../stores'
import { useNavigate } from 'react-router-dom'
import { LoadingPage } from '../../../../ui/pages'
import Swal from 'sweetalert2'

const columns = [
  { name: 'Nombre de Categoria', uid: 'name' },
  { name: 'Numero', uid: 'number' },
  { name: 'Detalle', uid: 'detail' },
  { name: 'Estado', uid: 'isActive' },
  { name: 'Fecha de creacion', uid: 'createdAt' },
  { name: 'Fecha de actualizacion', uid: 'updatedAt' },
  { name: 'Acciones', uid: 'actions' }
]

export const DepartmentsPage = () => {
  const findAll = useDepartmentsStore( state => state.findAll )
  const departments = useDepartmentsStore( state => state.departments )
  const isLoading = useDepartmentsStore( state => state.isLoading )
  const toggleStatus = useDepartmentsStore( state => state.toggleStatus )
  const error = useDepartmentsStore( state => state.error )
  const clearError = useDepartmentsStore( state => state.clearError )
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

  const onAddNewClick = () => navigate( '/admin/departments/create' )
  const onEditClick = ( id: string ) => navigate( `/admin/departments/edit/${ id }` )
  const onViewClick = ( id: string ) => navigate( `/admin/departments/view/${ id }` )

  const onToggleStatusClick = ( id: string ) => {
    toggleStatus( id )
  }

  return (
    <div>
      <div className="p-4 flex flex-col gap-16 justify-center items-center">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold"> Lista de Departamentos </h1>
        </div>
        <div className="flex justify-end">
          <PlusButton onClick={ onAddNewClick } />
        </div>
        <div className="flex justify-center items-center px-8">
          <CrudTable
            columns={ columns }
            data={ departments }
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
