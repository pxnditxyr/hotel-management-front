import { Route, Routes } from 'react-router-dom'
import { Reservations } from '../pages'
import { ReservationView } from '../pages/ReservationView'

export const ReservationsRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <Reservations /> } />
        <Route path=":id" element={ <ReservationView /> } />
      </Routes>
    </div>
  )
}
