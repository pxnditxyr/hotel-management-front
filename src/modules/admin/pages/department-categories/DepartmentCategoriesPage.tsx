import { useEffect } from 'react'
import { CrudTable, PlusButton } from '../../../../components'
import { useDepartmentCategoriesStore } from '../../../../stores'
import { useNavigate } from 'react-router-dom'
import { LoadingPage } from '../../../../ui/pages'
import Swal from 'sweetalert2'

const columns = [
  { name: 'Nombre de Categoria', uid: 'name' },
  { name: 'Estado', uid: 'isActive' },
  { name: 'Fecha de creacion', uid: 'createdAt' },
  { name: 'Fecha de actualizacion', uid: 'updatedAt' },
  { name: 'Acciones', uid: 'actions' }
]

export const DepartmentCategoriesPage = () => {
  const findAll = useDepartmentCategoriesStore( state => state.findAll )
  const departmentCategories = useDepartmentCategoriesStore( state => state.departmentCategories )
  const isLoading = useDepartmentCategoriesStore( state => state.isLoading )
  const toggleStatus = useDepartmentCategoriesStore( state => state.toggleStatus )
  const error = useDepartmentCategoriesStore( state => state.error )
  const clearError = useDepartmentCategoriesStore( state => state.clearError )
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

  const onAddNewClick = () => navigate( '/admin/department-categories/create' )
  const onEditClick = ( id: string ) => navigate( `/admin/department-categories/edit/${ id }` )
  const onViewClick = ( id: string ) => navigate( `/admin/department-categories/view/${ id }` )

  const onToggleStatusClick = ( id: string ) => {
    toggleStatus( id )
  }

  return (
    <div>
      <div className="p-4 flex flex-col gap-16 justify-center items-center">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold"> Lista de categorias </h1>
        </div>
        <div className="flex justify-end">
          <PlusButton onClick={ onAddNewClick } />
        </div>
        <div className="flex justify-center items-center px-8">
          <CrudTable
            columns={ columns }
            data={ departmentCategories }
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
