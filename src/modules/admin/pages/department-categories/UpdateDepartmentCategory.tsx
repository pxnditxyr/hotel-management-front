import { FormEvent, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Input } from '@nextui-org/react'
import { useDepartmentCategoriesStore } from '../../../../stores'
import Swal from 'sweetalert2'
import { UnexpectedError } from '../../../../ui/pages'
import { BackButton } from '../../../../ui/buttons/BackButton'

export const UpdateDepartmentCategory = () => {

  const id = useLocation().pathname.split( '/' ).pop() as string

  const update = useDepartmentCategoriesStore( state => state.update )
  const departmentCategories = useDepartmentCategoriesStore( state => state.departmentCategories )
  const departmentCategory = departmentCategories.find( departmentCategory => departmentCategory.id === id )
  if ( !departmentCategory ) return (
    <UnexpectedError
      code={ 404 }
      error="No se encontro la categoria que estas buscando"
    />
  )
  const error = useDepartmentCategoriesStore( state => state.error )
  const clearError = useDepartmentCategoriesStore( state => state.clearError )

  const navigate = useNavigate()

  const onGoBack = () => navigate( -1 )

  const onSubmit = ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const { departmentCategoryName } = event.target as HTMLFormElement
    update( id, { name: departmentCategoryName.value } )
    if ( !error ) {
      Swal.fire( {
        title: 'Categoria actualizada con exito',
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
      <BackButton onGoBack={ onGoBack }/>
      <h1 className="text-4xl font-bold text-center" > Actualizar Categoria </h1>
      <form
        className="flex flex-col gap-8 w-1/2 lg:w-1/4"
        onSubmit={ onSubmit }
      >
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="departmentCategoryName"
            label="Nombre de la Categoria"
            defaultValue={ departmentCategory.name }
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
