import { FormEvent, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useCustomersStore, useDepartmentsStore, useReservationsStore } from '../../../../stores'
import Swal from 'sweetalert2'
import { UnexpectedError } from '../../../../ui/pages'
import { BackButton } from '../../../../ui/buttons/BackButton'

export const UpdateReservation = () => {

  const id = useLocation().pathname.split( '/' ).pop() as string

  const update = useReservationsStore( state => state.update )
  const reservations = useReservationsStore( state => state.reservations )
  const customers = useCustomersStore( state => state.customers )
  const findAllCustomer = useCustomersStore( state => state.findAll )
  const departments = useDepartmentsStore( state => state.departments )
  const findAllDepartments = useDepartmentsStore( state => state.findAll )

  useEffect( () => {
    findAllCustomer()
    findAllDepartments()
  }, [] )

  const reservation = reservations.find( reservation => reservation.id === id )
  if ( !reservation ) return (
    <UnexpectedError
      code={ 404 }
      error="No se encontro la categoria que estas buscando"
    />
  )
  const error = useReservationsStore( state => state.error )
  const clearError = useReservationsStore( state => state.clearError )

  const navigate = useNavigate()

  const onGoBack = () => navigate( -1 )

  const onSubmit = ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const { customerId, departmentId, startDate, endDate, monetaryAdvance, paymentStatus } = event.target as HTMLFormElement
    update( id, {
      customerId: customerId.value,
      departmentId: departmentId.value,
      startDate: startDate.value,
      endDate: endDate.value,
      monetaryAdvance: Number( monetaryAdvance.value ),
      paymentStatus: paymentStatus.value
    } )
    if ( !error ) {
      Swal.fire( {
        title: 'Reservacion actualizada con exito',
        icon: 'success',
        confirmButtonText: 'Ok'
      } )
    }
  }

  useEffect( () => {
    if ( error ) {
      Swal.fire( {
        title: 'Error al crear la categoria',
        text: error,
        icon: 'error',
        confirmButtonText: 'Ok'
      } )
      clearError()
    }
  }, [ error, clearError ] )

  return (
    <div className="flex flex-col gap-20 w-full h-full p-20 justify-center items-center">
      <BackButton onGoBack={ onGoBack }/>
      <h1 className="text-4xl font-bold text-center" > Actualizar Reservacion </h1>
      <form
        className="flex flex-col gap-8 w-1/2 lg:w-1/4"
        onSubmit={ onSubmit }
      >
        <Select
          key="customerId"
          name="customerId"
          color="secondary"
          label="Cliente"
          placeholder="Seleccione un cliente"
          defaultSelectedKeys={[ reservation.customerId ]}
          className="w-full"
        >
          {
            customers.map( ( customer ) => (
              <SelectItem key={ customer.id } value={ customer.id }>
                { customer.name }
              </SelectItem>
            ) )}
        </Select>
        <Select
          key="departmentId"
          name="departmentId"
          color="secondary"
          label="Departamento"
          placeholder="Seleccione un departamento"
          defaultSelectedKeys={[ reservation.departmentId ]}
          className="w-full"
        >
          {
            departments.map( ( department ) => (
              <SelectItem key={ department.id } value={ department.id }>
                { department.name }
              </SelectItem>
            ) )}
        </Select>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="date"
            name="startDate"
            label="Fecha de inicio"
            placeholder="Fecha de inicio"
            defaultValue={ new Date( reservation.startDate ).toISOString().split( 'T' )[ 0 ] }
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="date"
            name="endDate"
            label="Fecha de fin"
            placeholder="Fecha de fin"
            defaultValue={ new Date( reservation.endDate ).toISOString().split( 'T' )[ 0 ] }
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="monetaryAdvance"
            label="Adelanto"
            defaultValue={ String( reservation.monetaryAdvance ) }
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="paymentStatus"
            label="Estado de pago"
            defaultValue={ reservation.paymentStatus }
          />
        </div>
        <Button
          color="success"
          className="w-full"
          type="submit"
        > Actualizar </Button>
      </form>
    </div>
  )
}
