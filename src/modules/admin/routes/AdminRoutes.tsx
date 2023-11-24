import { Navigate, Route, Routes } from 'react-router-dom'
import { CategoriesPage, CreateCategory, Dashboard } from '../pages'
import { AdminNavbar } from '../../../components'
import { useAuthStore } from '../../../stores'


export const AdminRoutes = () => {

  const onSignOut = useAuthStore( state => state.signout)

  return (
    <div className="min-h-screen">
      <AdminNavbar onSignOutClick={()=>{ onSignOut() }}/>
      <Routes>

        <Route path="dashboard" element={ <Dashboard /> } />
        <Route path="categories/*"
          element={
            <Routes>
              <Route path="/" element={ <CategoriesPage /> } />
              <Route path="create" element={ <CreateCategory /> } />
            </Routes>
          } />

        <Route path="*" element={ <Navigate to="/admin/dashboard" /> } />
      </Routes>
    </div>
  )
}
