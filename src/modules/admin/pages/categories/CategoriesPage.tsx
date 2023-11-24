import { useEffect } from 'react'
import { CrudTable, PlusButton } from '../../../../components'
import { useCategoriesStore } from '../../../../stores'
import { useNavigate } from 'react-router-dom'
import { LoadingPage } from '../../../../ui/pages'

const columns = [
  { name: 'Nombre de Categoria', uid: 'name' },
  { name: 'Estado', uid: 'isActive' },
  { name: 'Fecha de creacion', uid: 'createdAt' },
  { name: 'Fecha de actualizacion', uid: 'updatedAt' },
]

export const CategoriesPage = () => {
  const findAll = useCategoriesStore( state => state.findAll )
  const categories = useCategoriesStore( state => state.categories )
  const isLoading = useCategoriesStore( state => state.isLoading )
  const navigate = useNavigate()

  useEffect( () => {
    findAll()
  }, [] )

  if ( isLoading ) return ( <LoadingPage /> )

  const onAddNewClick = () => navigate( '/admin/categories/create' )

  return (
    <div>
      <div className="p-4 flex flex-col gap-16 justify-center items-center">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold"> Lista de categorias </h1>
        </div>
        <div className="flex justify-end">
          <PlusButton onClick={ onAddNewClick } />
        </div>
        <div className="flex justify-center items-center">
          <CrudTable columns={ columns } data={ categories } />
        </div>
      </div>
    </div>
  )
}
