import { Navigate, Route, Routes } from 'react-router-dom'
import { CategoriesPage, Dashboard } from '../pages'
import { AdminNavbar } from '../../../components'


export const AdminRoutes = () => {

  return (
    <div className="min-h-screen">
      <AdminNavbar />
      <Routes>

        <Route path="dashboard" element={ <Dashboard /> } />
        <Route path="categories" element={ <CategoriesPage /> } />

        <Route path="*" element={ <Navigate to="/admin/dashboard" /> } />
      </Routes>
    </div>
  )
}
