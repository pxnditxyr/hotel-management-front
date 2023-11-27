import { FormEvent, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Input } from '@nextui-org/react'
import { useCustomersStore } from '../../../../stores'
import Swal from 'sweetalert2'
import { UnexpectedError } from '../../../../ui/pages'
import { BackButton } from '../../../../ui/buttons/BackButton'

export const UpdateCustomer = () => {

  const id = useLocation().pathname.split( '/' ).pop() as string

  const update = useCustomersStore( state => state.update )
  const customers = useCustomersStore( state => state.customers )
  const customer = customers.find( customer => customer.id === id )
  if ( !customer ) return (
    <UnexpectedError
      code={ 404 }
      error="No se encontro la categoria que estas buscando"
    />
  )
  const error = useCustomersStore( state => state.error )
  const clearError = useCustomersStore( state => state.clearError )

  const navigate = useNavigate()

  const onGoBack = () => navigate( -1 )

  const onSubmit = ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const { customerName, lastname, dni, phone } = event.target as HTMLFormElement
    update(
      id,
      {
        name: customerName.value,
        lastname: lastname.value,
        dni: dni.value,
        phone: phone.value
      }
    )
    if ( !error ) {
      Swal.fire( {
        title: 'Cliente actualizada con exito',
        icon: 'success',
        confirmButtonText: 'Ok'
      } )
      customerName.value = ''
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
      <h1 className="text-4xl font-bold text-center" > Actualizar Cliente </h1>
      <form
        className="flex flex-col gap-8 w-1/2 lg:w-1/4"
        onSubmit={ onSubmit }
      >
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="customerName"
            label="Nombre"
            defaultValue={ customer.name }
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="lastname"
            label="Apellido"
            defaultValue={ customer.lastname }
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="dni"
            label="Cedula de Identidad"
            defaultValue={ customer.dni }
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="phone"
            label="Telefono"
            defaultValue={ customer.phone }
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
