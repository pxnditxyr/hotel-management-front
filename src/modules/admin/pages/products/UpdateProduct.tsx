import { FormEvent, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useCategoriesStore, useProductsStore } from '../../../../stores'
import Swal from 'sweetalert2'
import { UnexpectedError, BackButton} from '../../../../ui'

export const UpdateProduct = () => {

  const id = useLocation().pathname.split( '/' ).pop() as string

  const update = useProductsStore( state => state.update )
  const products = useProductsStore( state => state.products )
  const product = products.find( product => product.id === id )
  if ( !product ) return (
    <UnexpectedError
      code={ 404 }
      error="No se encontro la categoria que estas buscando"
    />
  )

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
    update( id, {
      name: productName.value,
      price: Number( price.value ),
      stock: Number( stock.value ),
      imageUrl: imageUrl.value,
      categoryId: categoryId.value
    } )
    if ( !error ) {
      Swal.fire( {
        title: 'Producto actualizada con exito',
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
  console.log(  )

  return (
    <div className="flex flex-col gap-20 w-full h-full p-20 justify-center items-center">
      <BackButton onGoBack={ onGoBack }/>
      <h1 className="text-4xl font-bold text-center" > Actualizar Producto </h1>
      <form
        className="flex flex-col gap-8 w-1/2 lg:w-1/4"
        onSubmit={ onSubmit }
      >
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="productName"
            label="Nombre del Producto"
            defaultValue={ product.name }
          />
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="price"
            label="Precio del Producto"
            value={ String( product.price ) }
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="stock"
            label="Cantidad en Stock"
            value={ String( product.stock ) }
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text" 
            name="imageUrl"
            label="Url de la imagen"
            value={ product.imageUrl }
          />
        </div>
        <Select
          key="categoryId"
          name="categoryId"
          color="secondary"
          label="Categoria"
          placeholder="Seleccione una categoria"
          defaultSelectedKeys={[ product.categoryId ]}
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
        > Actualizar </Button>
      </form>
    </div>
  )
}
