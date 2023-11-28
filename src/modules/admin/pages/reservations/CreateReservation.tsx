import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useCustomersStore, useDepartmentsStore, useReservationsStore } from '../../../../stores'
import { FormEvent, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export const CreateReservation = () => {

  const create = useReservationsStore( state => state.create )
  const error = useReservationsStore( state => state.error )
  const clearError = useReservationsStore( state => state.clearError )
  const customers = useCustomersStore( state => state.customers )
  const findAllCustomer = useCustomersStore( state => state.findAll )
  const departments = useDepartmentsStore( state => state.departments )
  const findAllDepartments = useDepartmentsStore( state => state.findAll )

  useEffect( () => {
    findAllCustomer()
    findAllDepartments()
  }, [] )

  const navigate = useNavigate()

  const onGoBack = () => navigate( -1 )

  const onSubmit = ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const {
      customerId, departmentId, startDate, endDate, monetaryAdvance, paymentStatus
    } = event.target as HTMLFormElement
    create({
      customerId: customerId.value,
      departmentId: departmentId.value,
      startDate: startDate.value,
      endDate: endDate.value,
      monetaryAdvance: Number( monetaryAdvance.value ),
      paymentStatus: paymentStatus.value
    })
    if ( !error ) {
      Swal.fire( {
        title: 'Categoria creada con exito',
        icon: 'success',
        confirmButtonText: 'Ok'
      } )
      startDate.value = ''
      endDate.value = ''
      monetaryAdvance.value = ''
      paymentStatus.value = ''
    }
  }

  useEffect( () => {
    if ( error ) {
      Swal.fire( {
        title: 'Error al crear la reservacion',
        text: error,
        icon: 'error',
        confirmButtonText: 'Ok'
      } )
      clearError()
    }
  }, [ error, clearError ] )

  return (
    <div className="flex flex-col gap-20 w-full h-full p-20 justify-center items-center">
      <Button
        color="primary"
        variant="shadow"
        onClick={ onGoBack }
        className="absolute top-24 left-12"
      >
        Volver Atras
      </Button> 
      <h1 className="text-4xl font-bold text-center" > Crear Nueva Reservacion </h1>
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
          defaultSelectedKeys={[]}
          className="w-full"
        >
          {
            customers.filter( a => a.isActive ).map( ( customer ) => (
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
          defaultSelectedKeys={[]}
          className="w-full"
        >
          {
            departments.filter( b => b.isActive ).map( ( department ) => (
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
            defaultValue={ new Date().toISOString().split( 'T' )[ 0 ] }
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="date"
            name="endDate"
            label="Fecha de fin"
            placeholder="Fecha de fin"
            defaultValue={ new Date( Date.now() + 86400000 ).toISOString().split( 'T' )[ 0 ] }

          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="monetaryAdvance"
            label="Adelanto"
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="paymentStatus"
            label="Estado de pago"
          />
        </div>
        <Button
          color="success"
          className="w-full"
          type="submit"
        > Crear </Button>  
      </form>
    </div>
  )
}
