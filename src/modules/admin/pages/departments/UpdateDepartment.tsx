import { FormEvent, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useDepartmentCategoriesStore, useDepartmentsStore, useFloorsStore } from '../../../../stores'
import Swal from 'sweetalert2'
import { UnexpectedError } from '../../../../ui/pages'
import { BackButton } from '../../../../ui/buttons/BackButton'

export const UpdateDeparment = () => {

  const id = useLocation().pathname.split( '/' ).pop() as string

  const update = useDepartmentsStore( state => state.update )
  const departments = useDepartmentsStore( state => state.departments )
  const department = departments.find( department => department.id === id )
  if ( !department ) return (
    <UnexpectedError
      code={ 404 }
      error="No se encontro la categoria que estas buscando"
    />
  )
  const error = useDepartmentsStore( state => state.error )
  const clearError = useDepartmentsStore( state => state.clearError )
  const departmentCategories = useDepartmentCategoriesStore( state => state.departmentCategories )
  const floors = useFloorsStore( state => state.floors )
  const findAllDepartmentCategories = useDepartmentCategoriesStore( state => state.findAll )
  const findAllFloors = useFloorsStore( state => state.findAll )

  useEffect( () => {
    findAllDepartmentCategories()
    findAllFloors()
  }, [ findAllDepartmentCategories, findAllFloors ] )

  const navigate = useNavigate()

  const onGoBack = () => navigate( -1 )

  const onSubmit = ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const { departmentName, number, detail, floorId, departmentCategoryId, imageUrl } = event.target as HTMLFormElement
    update( id, {
      name: departmentName.value,
      number: Number( number.value ),
      detail: detail.value,
      imageUrl: imageUrl.value,
      floorId: floorId.value,
      departmentCategoryId: departmentCategoryId.value,
    } )
    if ( !error ) {
      Swal.fire( {
        title: 'Departamento actualizado con exito',
        icon: 'success',
        confirmButtonText: 'Ok'
      } )
      departmentName.value = ''
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
      <h1 className="text-4xl font-bold text-center" > Actualizar Departamento </h1>
      <form
        className="flex flex-col gap-8 w-1/2 lg:w-1/4"
        onSubmit={ onSubmit }
      >
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="departmentName"
            label="Nombre del Departamento"
            defaultValue={ department.name }
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="number"
            label="Numero del Departamento"
            defaultValue={ String( department.number ) }
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="detail"
            label="Detalle del Departamento"
            defaultValue={ department.detail }
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="imageUrl"
            label="Url de la imagen"
            defaultValue={ department.imageUrl }
          />
        </div>
        <Select
          key="departmentCategoryId"
          name="departmentCategoryId"
          color="secondary"
          label="Categoria"
          placeholder="Seleccione una categoria"
          defaultSelectedKeys={[ department.departmentCategoryId ]}
          className="w-full"
          required
        >
          {
            departmentCategories.map( ( category ) => (
              <SelectItem key={ category.id } value={ category.id }>
                { category.name }
              </SelectItem>
            ) )
          }
        </Select>
        <Select
          key="floorId"
          name="floorId"
          color="secondary"
          label="Piso"
          placeholder="Seleccione un piso"
          defaultSelectedKeys={[ department.floorId ]}
          className="w-full"
          required
        >
          {
            floors.map( ( floor ) => (
              <SelectItem key={ floor.id } value={ floor.id }>
                { floor.name }
              </SelectItem>
            ) )
          }
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
