import { useEffect } from 'react'
import { CrudTable, PlusButton } from '../../../../components'
import { useOrdersStore } from '../../../../stores'
import { useNavigate } from 'react-router-dom'
import { LoadingPage } from '../../../../ui/pages'
import Swal from 'sweetalert2'
// "customerId": "8ab7062c-054c-47e0-b5d5-671c1174238a",
//   "method": "delivery",
//   "totalProducts": 2,
//   "totalAmount": 100,
//   "paymentStatus": "pending"

const columns = [
  { name: 'Customer', uid: 'customer' },
  { name: 'Metodo de pago', uid: 'method' },
  { name: 'Total de productos', uid: 'totalProducts' },
  { name: 'Total', uid: 'totalAmount' },
  { name: 'Estado de pago', uid: 'paymentStatus' },
  { name: 'Estado', uid: 'isActive' },
  { name: 'Fecha de creacion', uid: 'createdAt' },
  { name: 'Fecha de actualizacion', uid: 'updatedAt' },
  { name: 'Acciones', uid: 'actions' }
]

export const OrdersPage = () => {
  const findAll = useOrdersStore( state => state.findAll )
  const orders = useOrdersStore( state => state.orders )
  const isLoading = useOrdersStore( state => state.isLoading )
  const toggleStatus = useOrdersStore( state => state.toggleStatus )
  const error = useOrdersStore( state => state.error )
  const clearError = useOrdersStore( state => state.clearError )
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

  const onAddNewClick = () => navigate( '/admin/orders/create' )
  const onEditClick = ( id: string ) => navigate( `/admin/orders/edit/${ id }` )
  const onViewClick = ( id: string ) => navigate( `/admin/orders/view/${ id }` )

  const onToggleStatusClick = ( id: string ) => {
    toggleStatus( id )
  }

  return (
    <div>
      <div className="p-4 flex flex-col gap-16 justify-center items-center">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold"> Lista de Ordenes </h1>
        </div>
        <div className="flex justify-end">
          <PlusButton onClick={ onAddNewClick } />
        </div>
        <div className="flex justify-center items-center px-8">
          <CrudTable
            columns={ columns }
            data={ orders.map( ( order ) => ({
              ...order,
              customer: order.customer?.name,
            }) ) }
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
