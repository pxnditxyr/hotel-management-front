import { Route, Routes } from 'react-router-dom'
import { Reservations } from '../pages'

export const ReservationsRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <Reservations /> } />
      </Routes>
    </div>
  )
}
