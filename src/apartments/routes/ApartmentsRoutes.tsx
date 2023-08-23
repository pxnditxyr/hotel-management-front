import { Route, Routes } from 'react-router-dom'
import { Apartments } from '../pages'

export const ApartmentsRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <Apartments /> } />
      </Routes>
    </div>
  )
}
