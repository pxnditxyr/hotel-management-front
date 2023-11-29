import { FormEvent, useEffect } from 'react'
import { useContactUsStore } from '../../../stores'
import { PublicLayout } from '../layout'
import Swal from 'sweetalert2'
import { Button, Input, Textarea } from '@nextui-org/react'

export const Contact = () => {

  const createContact = useContactUsStore( state => state.create )
  const error = useContactUsStore( state => state.error )
  const clearError = useContactUsStore( state => state.clearError )

  const onSubmit = ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const { contactName, email, message } = event.target as HTMLFormElement
    createContact({
      name: contactName.value,
      email: email.value,
      message: message.value
    })
    if ( !error ) {
      Swal.fire( {
        title: 'Formulario enviado',
        icon: 'success',
        confirmButtonText: 'Ok'
      } )
      contactName.value = ''
      email.value = ''
      message.value = ''
    }
  }

  useEffect( () => {
    if ( error ) {
      Swal.fire( {
        title: 'Error al subir su formulario',
        text: error,
        icon: 'error',
        confirmButtonText: 'Ok'
      } )
      clearError()
    }
  }, [ error, clearError ] )

  return (
    <PublicLayout
      style={{
        backgroundImage: `url(/background_day_ver_1.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      title="Contactanos" 
      navClassName="bg-white bg-opacity-50 text-black text-md"
      linkClassName="text-md font-bold text-center"
    >
      <div className="flex flex-col items-center justify-center p-8 w-full min-w-96 sm:max-w-[600px]">
        <form
          onSubmit={ onSubmit }
          className="flex flex-col items-center justify-center w-full p-8 bg-black/70 rounded-lg shadow-lg gap-12"
        >
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              type="text" 
              name="contactName"
              label="Nombre"
            />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              type="email" 
              name="email"
              label="Email"
            />
          </div>

          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Textarea
              label="Mensaje"
              variant="bordered"
              labelPlacement="outside"
              placeholder="Escribe tu mensaje"
              name="message"
            />
          </div>
          <Button
            color="success"
            className="w-full"
            type="submit"
          > Crear </Button>
        </form>
      </div>

    </PublicLayout>
  )
}
