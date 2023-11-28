import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useCategoriesStore, useProductsStore } from '../../../../stores'
import { FormEvent, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export const CreateProduct = () => {

  const create = useProductsStore( state => state.create )
  const error = useProductsStore( state => state.error )
  const clearError = useProductsStore( state => state.clearError )
  const categories = useCategoriesStore( state => state.categories )
  const findAllCategories = useCategoriesStore( state => state.findAll )
  useEffect( () => {
    findAllCategories()
  }, [] )

  const navigate = useNavigate()

  const onGoBack = () => navigate( -1 )

  const onSubmit = ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const { productName, price, stock, imageUrl, categoryId } = event.target as HTMLFormElement
    create({
      name: productName.value,
      price: Number( price.value ),
      stock: Number( stock.value ),
      imageUrl: imageUrl.value,
      categoryId: categoryId.value
    })
    if ( !error ) {
      Swal.fire( {
        title: 'Categoria creada con exito',
        icon: 'success',
        confirmButtonText: 'Ok'
      } )
      productName.value = ''
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
      <h1 className="text-4xl font-bold text-center" > Crear Nuevo Producto </h1>
      <form
        className="flex flex-col gap-8 w-1/2 lg:w-1/4"
        onSubmit={ onSubmit }
      >
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="productName"
            label="Nombre del Producto"
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="price"
            label="Precio del Producto"
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="stock"
            label="Cantidad en Stock"
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="imageUrl"
            label="Url de la imagen"
          />
        </div>
        <Select
          key="categoryId"
          name="categoryId"
          color="secondary"
          label="Categoria"
          placeholder="Seleccione una categoria"
          defaultSelectedKeys={[]}
          className="w-full"
        >
          {
            categories.filter( a => a.isActive ).map( ( category ) => (
            <SelectItem key={ category.id } value={ category.id }>
              { category.name }
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
