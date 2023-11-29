import { Navigate, Route, Routes } from 'react-router-dom'
import {
  CategoriesPage, CreateCategory, CreateCustomer, CreateDepartment,
  CreateFloor, CreateOrder, CreateProduct, CreateReport, CreateReservation,
  CustomersPage, Dashboard, DepartmentsPage, FloorsPage, OrdersPage, ProductsPage,
  ReportsPage, ReservationsPage, UpdateCustomer, UpdateDeparment, UpdateFloor,
  UpdateOrder, UpdateProduct, UpdateReport, UpdateReservation, ViewCustomer,
  ViewDepartment, ViewDepartmentCategory, ViewFloor, ViewOrder, ViewProduct,
  ViewReport, ViewReservation
} from '../pages'
import { AdminNavbar } from '../../../components'
import { useAuthStore } from '../../../stores'
import { UpdateCategory } from '../pages/categories/UpdateCategory'
import { ViewCategory } from '../pages/categories/ViewCategory'
import { DepartmentCategoriesPage } from '../pages/department-categories/DepartmentCategoriesPage'
import { CreateDepartmentCategory } from '../pages/department-categories/CreateDepartmentCategory'
import { UpdateDepartmentCategory } from '../pages/department-categories/UpdateDepartmentCategory'
import { ContactsPage } from '../pages/contacts/ContactsPage'
import { ViewContact } from '../pages/contacts/ViewContact'

export const AdminRoutes = () => {

  const onSignOut = useAuthStore( state => state.signout)

  return (
    <div className="min-h-screen w-full overflow-x-auto bg-background flex flex-col">
      <AdminNavbar onSignOutClick={()=>{ onSignOut() }}/>
      <Routes>

        <Route path="dashboard" element={ <Dashboard /> } />
        <Route path="categories/*"
          element={
            <Routes>
              <Route path="/" element={ <CategoriesPage /> } />
              <Route path="create" element={ <CreateCategory /> } />
              <Route path="edit/:id" element={ <UpdateCategory /> } />
              <Route path="view/:id" element={ <ViewCategory /> } />
              <Route path="*" element={ <Navigate to="/admin/dashboard" /> } />
            </Routes>
          } />

        <Route path="customers/*" element={
          <Routes>
            <Route path="/" element={ <CustomersPage /> } />
            <Route path="create" element={ <CreateCustomer /> } />
            <Route path="edit/:id" element={ <UpdateCustomer /> } />
            <Route path="view/:id" element={ <ViewCustomer /> } />
            <Route path="*" element={ <Navigate to="/admin/dashboard" /> } />
          </Routes>
        } />

        <Route path="products/*" element={
          <Routes>
            <Route path="/" element={ <ProductsPage /> } />
            <Route path="create" element={ <CreateProduct /> } />
            <Route path="edit/:id" element={ <UpdateProduct /> } />
            <Route path="view/:id" element={ <ViewProduct /> } />
            <Route path="*" element={ <Navigate to="/admin/dashboard" /> } />
          </Routes>
        } />

        <Route path="departments/*" element={
          <Routes>
            <Route path="/" element={ <DepartmentsPage /> } />
            <Route path="create" element={ <CreateDepartment /> } />
            <Route path="edit/:id" element={ <UpdateDeparment /> } />
            <Route path="view/:id" element={ <ViewDepartment /> } />
            <Route path="*" element={ <Navigate to="/admin/dashboard" /> } />
          </Routes>
        } />

        <Route path="department-categories/*" element={
          <Routes>
            <Route path="/" element={ <DepartmentCategoriesPage /> } />
            <Route path="create" element={ <CreateDepartmentCategory /> } />
            <Route path="edit/:id" element={ <UpdateDepartmentCategory /> } />
            <Route path="view/:id" element={ <ViewDepartmentCategory /> } />
            <Route path="*" element={ <Navigate to="/admin/dashboard" /> } />
          </Routes>
        } />


        <Route path="floors/*" element={
          <Routes>
            <Route path="/" element={ <FloorsPage /> } />
            <Route path="create" element={ <CreateFloor /> } />
            <Route path="edit/:id" element={ <UpdateFloor /> } />
            <Route path="view/:id" element={ <ViewFloor /> } />
            <Route path="*" element={ <Navigate to="/admin/dashboard" /> } />
          </Routes>
        } />

        <Route path="reservations/*" element={
          <Routes>
            <Route path="/" element={ <ReservationsPage /> } />
            <Route path="create" element={ <CreateReservation /> } />
            <Route path="edit/:id" element={ <UpdateReservation /> } />
            <Route path="view/:id" element={ <ViewReservation /> } />
            <Route path="*" element={ <Navigate to="/admin/dashboard" /> } />
          </Routes>
        } />

        <Route path="orders/*" element={
          <Routes>
            <Route path="/" element={ <OrdersPage /> } />
            <Route path="create" element={ <CreateOrder /> } />
            <Route path="edit/:id" element={ <UpdateOrder /> } />
            <Route path="view/:id" element={ <ViewOrder /> } />
            <Route path="*" element={ <Navigate to="/admin/dashboard" /> } />
          </Routes>
        } />

        <Route path="reports/*" element={
          <Routes>
            <Route path="/" element={ <ReportsPage /> } />
            <Route path="create" element={ <CreateReport /> } />
            <Route path="edit/:id" element={ <UpdateReport /> } />
            <Route path="view/:id" element={ <ViewReport /> } />
            <Route path="*" element={ <Navigate to="/admin/dashboard" /> } />
          </Routes>
        } />

        <Route path="contact/*" element={
          <Routes>
            <Route path="/" element={ <ContactsPage /> } />
            <Route path="view/:id" element={ <ViewContact /> } />
            <Route path="*" element={ <Navigate to="/admin/dashboard" /> } />
          </Routes>
        } />

        <Route path="*" element={ <Navigate to="/admin/dashboard" /> } />
      </Routes>
    </div>
  )
}
