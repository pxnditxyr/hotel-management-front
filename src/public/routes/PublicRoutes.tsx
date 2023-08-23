import { Route, Routes } from 'react-router-dom'
import { About, Contact, Home } from '../pages'
import { ReservationsRoutes } from '../../reservations'
import { ApartmentsRoutes } from '../../apartments'
import { NotFound } from '../../ui'


export const PublicRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="about" element={ <About /> } />
        <Route path="contact" element={ <Contact /> } />
        <Route path="reservations" element={ <ReservationsRoutes /> } />
        <Route path="apartments" element={ <ApartmentsRoutes /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </div>
  )
}
