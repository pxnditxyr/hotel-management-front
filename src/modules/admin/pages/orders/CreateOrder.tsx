import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useOrdersStore, useCustomersStore } from '../../../../stores'
import { FormEvent, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export const CreateOrder = () => {

  const create = useOrdersStore( state => state.create )
  const error = useOrdersStore( state => state.error )
  const clearError = useOrdersStore( state => state.clearError )
  const customers = useCustomersStore( state => state.customers )
  const findAll = useCustomersStore( state => state.findAll )

  useEffect( () => {
    findAll()
  }, [] )

  const navigate = useNavigate()

  const onGoBack = () => navigate( -1 )

  const onSubmit = ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const { customerId, paymentMethod, totalProducts, totalAmount, paymentStatus } = event.target as HTMLFormElement
    create({
      customerId: customerId.value,
      method: paymentMethod.value,
      totalProducts: Number( totalProducts.value ),
      totalAmount: Number( totalAmount.value ),
      paymentStatus: paymentStatus.value
    })
    if ( !error ) {
      Swal.fire( {
        title: 'Orden creada con exito',
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
      <Button
        color="primary"
        variant="shadow"
        onClick={ onGoBack }
        className="absolute top-24 left-12"
      >
        Volver Atras
      </Button> 
      <h1 className="text-4xl font-bold text-center" > Crear Nueva Orden </h1>
      <form
        className="flex flex-col gap-8 w-1/2 lg:w-1/4"
        onSubmit={ onSubmit }
      >
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="paymentMethod"
            label="Metodo de Pago"
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="totalProducts"
            label="Total de Productos"
          />
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="totalAmount"
            label="Total"
          />
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text"
            name="paymentStatus"
            label="Estado de Pago"
          />
        </div>

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
            customers.filter( customer => customer.isActive ).map( ( customer ) => (
            <SelectItem key={ customer.id } value={ customer.id }>
              { customer.name }
            </SelectItem>
          ) )}
        </Select>

        <Button
          color="success"
          className="w-full"
          type="submit"
        > Crear </Button>  
      </form>
    </div>
  )
}
