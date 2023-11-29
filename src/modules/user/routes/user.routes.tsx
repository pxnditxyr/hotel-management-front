import { Route, Routes } from "react-router-dom"
import { ApartmentsRoutes } from "../../apartments"
import { ReservationsRoutes } from "../../reservations"
import { UserMainPage } from "../pages/user-main.page"

export const UserRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <UserMainPage /> } />
        <Route path="apartments/*" element={ <ApartmentsRoutes /> } />
        <Route path="reservations/*" element={ <ReservationsRoutes /> } />
        <Route path="my-profile" element={ <UserMainPage /> } />
      </Routes>
    </div>
  )
}
