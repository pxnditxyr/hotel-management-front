import { useLocation } from 'react-router-dom'

export const NotFound = () => {
  const location = useLocation()
  const { pathname } = location

  return (
    <div>
      <h1> 404 </h1>
      <p> Pagina no encontrada </p>
      <p> la ruta '{ pathname }' no existe </p>
    </div>
  )
}
