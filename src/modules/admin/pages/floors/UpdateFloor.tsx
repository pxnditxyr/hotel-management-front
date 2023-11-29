import { FormEvent, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Input } from '@nextui-org/react'
import { useFloorsStore } from '../../../../stores'
import Swal from 'sweetalert2'
import { UnexpectedError, BackButton } from '../../../../ui'

export const UpdateFloor = () => {

  const id = useLocation().pathname.split( '/' ).pop() as string

  const update = useFloorsStore( state => state.update )
  const floors = useFloorsStore( state => state.floors )
  const floor = floors.find( floor => floor.id === id )
  if ( !floor ) return (
    <UnexpectedError
      code={ 404 }
      error="No se encontro la categoria que estas buscando"
    />
  )
  const error = useFloorsStore( state => state.error )
  const clearError = useFloorsStore( state => state.clearError )

  const navigate = useNavigate()

  const onGoBack = () => navigate( -1 )

  const onSubmit = ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const { floorName, number, detail, imageUrl } = event.target as HTMLFormElement
    update( id, {
      name: floorName.value,
      number: Number( number.value ),
      detail: detail.value,
      imageUrl: imageUrl.value,
    } )
    if ( !error ) {
      Swal.fire( {
        title: 'Piso actualizado con exito',
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
      <h1 className="text-4xl font-bold text-center" > Actualizar Piso </h1>
      <form
        className="flex flex-col gap-8 w-1/2 lg:w-1/4"
        onSubmit={ onSubmit }
      >
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="floorName"
            label="Nombre del Piso"
            defaultValue={ floor.name }
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="number"
            label="Numero del Piso"
            defaultValue={ String( floor.number ) }
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="detail"
            label="Detalle del Piso"
            defaultValue={ floor.detail }
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="imageUrl"
            label="Url de la imagen"
            defaultValue={ floor.imageUrl }
          />
        </div>
        <Button
          color="success"
          className="w-full"
          type="submit"
        > Actualizar Piso </Button>
      </form>
    </div>
  )
}
