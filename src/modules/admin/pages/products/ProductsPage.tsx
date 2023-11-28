import { useEffect } from 'react'
import { CrudTable, PlusButton } from '../../../../components'
import { useProductsStore } from '../../../../stores'
import { useNavigate } from 'react-router-dom'
import { LoadingPage } from '../../../../ui/pages'
import Swal from 'sweetalert2'

const columns = [
  { name: 'Nombre', uid: 'name' },
  { name: 'Precio', uid: 'price' },
  { name: 'Stock', uid: 'stock' },
  { name: 'Estado', uid: 'isActive' },
  { name: 'Fecha de creacion', uid: 'createdAt' },
  { name: 'Fecha de actualizacion', uid: 'updatedAt' },
  { name: 'Acciones', uid: 'actions' }
]

export const ProductsPage = () => {
  const findAll = useProductsStore( state => state.findAll )
  const products = useProductsStore( state => state.products )
  const isLoading = useProductsStore( state => state.isLoading )
  const toggleStatus = useProductsStore( state => state.toggleStatus )
  const error = useProductsStore( state => state.error )
  const clearError = useProductsStore( state => state.clearError )
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

  const onAddNewClick = () => navigate( '/admin/products/create' )
  const onEditClick = ( id: string ) => navigate( `/admin/products/edit/${ id }` )
  const onViewClick = ( id: string ) => navigate( `/admin/products/view/${ id }` )

  const onToggleStatusClick = ( id: string ) => {
    toggleStatus( id )
  }

  return (
    <div>
      <div className="p-4 flex flex-col gap-16 justify-center items-center">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold"> Lista de Productos </h1>
        </div>
        <div className="flex justify-end">
          <PlusButton onClick={ onAddNewClick } />
        </div>
        <div className="flex justify-center items-center px-8">
          <CrudTable
            columns={ columns }
            data={ products }
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
