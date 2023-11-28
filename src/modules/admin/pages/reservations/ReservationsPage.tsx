import { useEffect } from 'react'
import { CrudTable, PlusButton } from '../../../../components'
import { useReservationsStore } from '../../../../stores'
import { useNavigate } from 'react-router-dom'
import { LoadingPage } from '../../../../ui/pages'
import Swal from 'sweetalert2'

const columns = [
  { name: 'Cliente', uid: 'customer' },
  { name: 'Departamento', uid: 'department' },
  { name: 'Fecha de inicio', uid: 'startDate' },
  { name: 'Fecha de fin', uid: 'endDate' },
  { name: 'Adelanto', uid: 'monetaryAdvance' },
  { name: 'Estado de pago', uid: 'paymentStatus' },
  { name: 'Estado', uid: 'isActive' },
  { name: 'Fecha de creacion', uid: 'createdAt' },
  { name: 'Fecha de actualizacion', uid: 'updatedAt' },
  { name: 'Acciones', uid: 'actions' }
]

export const ReservationsPage = () => {
  const findAll = useReservationsStore( state => state.findAll )
  const reservations = useReservationsStore( state => state.reservations )
  const isLoading = useReservationsStore( state => state.isLoading )
  const toggleStatus = useReservationsStore( state => state.toggleStatus )
  const error = useReservationsStore( state => state.error )
  const clearError = useReservationsStore( state => state.clearError )
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

  const onAddNewClick = () => navigate( '/admin/reservations/create' )
  const onEditClick = ( id: string ) => navigate( `/admin/reservations/edit/${ id }` )
  const onViewClick = ( id: string ) => navigate( `/admin/reservations/view/${ id }` )

  const onToggleStatusClick = ( id: string ) => {
    toggleStatus( id )
  }

  return (
    <div>
      <div className="p-4 flex flex-col gap-16 justify-center items-center">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold"> Lista de Reservaciones </h1>
        </div>
        <div className="flex justify-end">
          <PlusButton onClick={ onAddNewClick } />
        </div>
        <div className="flex justify-center items-center px-8">
          <CrudTable
            columns={ columns }
            data={ reservations.map( ( reservation ) => ({
              ...reservation,
              customer: reservation.customer?.name,
              department: reservation.department?.name,

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
