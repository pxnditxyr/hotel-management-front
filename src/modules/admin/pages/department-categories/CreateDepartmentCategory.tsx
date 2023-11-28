import { Button, Input } from '@nextui-org/react'
import { useDepartmentCategoriesStore } from '../../../../stores'
import { FormEvent, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export const CreateDepartmentCategory = () => {

  const create = useDepartmentCategoriesStore( state => state.create )
  const error = useDepartmentCategoriesStore( state => state.error )
  const clearError = useDepartmentCategoriesStore( state => state.clearError )

  const navigate = useNavigate()

  const onGoBack = () => navigate( -1 )

  const onSubmit = ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const { departmentCategoryName } = event.target as HTMLFormElement
    create({ name: departmentCategoryName.value })
    if ( !error ) {
      Swal.fire( {
        title: 'Categoria creada con exito',
        icon: 'success',
        confirmButtonText: 'Ok'
      } )
      departmentCategoryName.value = ''
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
      <h1 className="text-4xl font-bold text-center" > Crear Nueva Categoria </h1>
      <form
        className="flex flex-col gap-8 w-1/2 lg:w-1/4"
        onSubmit={ onSubmit }
      >
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="departmentCategoryName"
            label="Nombre de la Categoria"
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
