import { Navigate, Route, Routes } from 'react-router-dom'
import { About, Contact, Home } from '../pages'
import { ReservationsRoutes } from '../../reservations'
import { ApartmentsRoutes } from '../../apartments'
import { AuthRoutes } from '../../auth'
import { UnexpectedError } from '../../../ui'

export const PublicRoutes = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="about" element={ <About /> } />
        <Route path="contact" element={ <Contact /> } />
        <Route path="reservations/*" element={ <ReservationsRoutes /> } />
        <Route path="apartments/*" element={ <ApartmentsRoutes /> } />
        <Route path="auth/*" element={ <AuthRoutes /> } />
        <Route path="user/*" element={ <Navigate to="/auth/signin" /> } />
        <Route path="admin/*" element={ <Navigate to="/auth/signin" /> } />
        <Route path="*" element={ <UnexpectedError error="Lo sentimos, no encontramos lo que buscas" /> } />
      </Routes>
    </div>
  )
}
