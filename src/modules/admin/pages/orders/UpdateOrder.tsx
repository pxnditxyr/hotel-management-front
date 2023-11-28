import { FormEvent, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useCustomersStore, useOrdersStore } from '../../../../stores'
import Swal from 'sweetalert2'
import { UnexpectedError } from '../../../../ui/pages'
import { BackButton } from '../../../../ui/buttons/BackButton'

export const UpdateOrder = () => {

  const id = useLocation().pathname.split( '/' ).pop() as string

  const update = useOrdersStore( state => state.update )
  const orders = useOrdersStore( state => state.orders )
  const order = orders.find( order => order.id === id )
  if ( !order ) return (
    <UnexpectedError
      code={ 404 }
      error="No se encontro la categoria que estas buscando"
    />
  )
  const customers = useCustomersStore( state => state.customers )
  const findAll = useCustomersStore( state => state.findAll )

  useEffect( () => {
    findAll()
  }, [] )


  const error = useOrdersStore( state => state.error )
  const clearError = useOrdersStore( state => state.clearError )

  const navigate = useNavigate()

  const onGoBack = () => navigate( -1 )

  const onSubmit = ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const { customerId, paymentMethod, totalProducts, totalAmount, paymentStatus } = event.target as HTMLFormElement
    update( id, {
      customerId: customerId.value,
      method: paymentMethod.value,
      totalProducts: Number( totalProducts.value ),
      totalAmount: Number( totalAmount.value ),
      paymentStatus: paymentStatus.value
    } )
    if ( !error ) {
      Swal.fire( {
        title: 'Orden actualizada con exito',
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
      <h1 className="text-4xl font-bold text-center" > Actualizar Orden </h1>
      <form
        className="flex flex-col gap-8 w-1/2 lg:w-1/4"
        onSubmit={ onSubmit }
      >
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="paymentMethod"
            label="Metodo de Pago"
            defaultValue={ order.method }
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="totalProducts"
            label="Total de Productos"
            defaultValue={ String( order.totalProducts ) }
          />
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="totalAmount"
            label="Total"
            defaultValue={ String( order.totalAmount ) }
          />
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text"
            name="paymentStatus"
            label="Estado de Pago"
            defaultValue={ order.paymentStatus }
          />
        </div>

        <Select
          key="customerId"
          name="customerId"
          color="secondary"
          label="Cliente"
          placeholder="Seleccione un cliente"
          defaultSelectedKeys={[ order.customerId ]}
          className="w-full"
        >
          {
            customers.filter( a => a.isActive ).map( ( customer ) => (
            <SelectItem key={ customer.id } value={ customer.id }>
              { customer.name }
            </SelectItem>
          ) )}
        </Select>
        <Button
          color="success"
          className="w-full"
          type="submit"
        > Actualizar </Button>  
      </form>
    </div>
  )
}
