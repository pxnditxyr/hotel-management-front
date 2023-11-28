import { Button, Input } from '@nextui-org/react'
import { useFloorsStore } from '../../../../stores'
import { FormEvent, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export const CreateFloor = () => {

  const create = useFloorsStore( state => state.create )
  const error = useFloorsStore( state => state.error )
  const clearError = useFloorsStore( state => state.clearError )

  const navigate = useNavigate()

  const onGoBack = () => navigate( -1 )

  const onSubmit = ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const { floorName, number, detail } = event.target as HTMLFormElement
    create({
      name: floorName.value,
      number: Number( number.value ),
      detail: detail.value
    })
    if ( !error ) {
      Swal.fire( {
        title: 'Piso creada con exito',
        icon: 'success',
        confirmButtonText: 'Ok'
      } )
      floorName.value = ''
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
      <h1 className="text-4xl font-bold text-center" > Crear Nuevo Piso </h1>
      <form
        className="flex flex-col gap-8 w-1/2 lg:w-1/4"
        onSubmit={ onSubmit }
      >
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="floorName"
            label="Nombre de la Piso"
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="number"
            label="Numero de la Piso"
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="detail"
            label="Detalle de la Piso"
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
