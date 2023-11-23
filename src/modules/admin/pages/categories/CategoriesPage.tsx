import { CrudTable } from '../../../../components'

export const CategoriesPage = () => {
  return (
    <div>
      <h1> Categories Page </h1>
      <div className="p-4">
        <h1 className="text-2xl font-bold"> List of Categories </h1>
        <CrudTable />
      </div>
    </div>
  )
}
