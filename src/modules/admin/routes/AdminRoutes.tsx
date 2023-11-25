import { Navigate, Route, Routes } from 'react-router-dom'
import { CategoriesPage, CreateCategory, CreateCustomer, CreateDepartment, CreateFloor, CreateOrder, CreateProduct, CreateReport, CreateReservation, CustomersPage, Dashboard, DepartmentPage, FloorsPage, OrdersPage, ProductsPage, ReportsPage, ReservationsPage, UpdateCustomer, UpdateDeparment, UpdateFloor, UpdateOrder, UpdateProduct, UpdateReport, UpdateReservation, ViewCustomer, ViewDepartment, ViewFloor, ViewOrder, ViewProduct, ViewReport, ViewReservation } from '../pages'
import { AdminNavbar } from '../../../components'
import { useAuthStore } from '../../../stores'
import { UpdateCategory } from '../pages/categories/UpdateCategory'
import { ViewCategory } from '../pages/categories/ViewCategory'


// tent className="hidden sm:flex gap-4" justify="center">
//         <NavbarItem isActive={ isActive('/admin/dashboard') }>
//           <Link href="/admin/dashboard" color={ isActive('/admin/dashboard') ? 'secondary' : 'foreground' }>
//             Panel de Control
//           </Link>
//         </NavbarItem>
//         <NavbarItem isActive={ isActive('/admin/categories') }>
//           <Link href="/admin/categories" color={ isActive('/admin/categories') ? 'secondary' : 'foreground' }>
//             Categorias
//           </Link>
//         </NavbarItem>
//         <NavbarItem isActive={ isActive('/admin/customers') }>
//           <Link href="/admin/customers" color={ isActive('/admin/customers') ? 'secondary' : 'foreground' }>
//             Clientes
//           </Link>
//         </NavbarItem>
//         <NavbarItem isActive={ isActive('/admin/products') }>
//           <Link href="/admin/products" color={ isActive('/admin/products') ? 'secondary' : 'foreground' }>
//             Productos
//           </Link>
//         </NavbarItem>
//         <NavbarItem isActive={ isActive('/admin/departments') }>
//           <Link href="/admin/departments" color={ isActive('/admin/departments') ? 'secondary' : 'foreground' }>
//             Departamentos
//           </Link>
//         </NavbarItem>
//         <NavbarItem isActive={ isActive('/admin/employees') }>
//           <Link href="/admin/floors" color={ isActive('/admin/floors') ? 'secondary' : 'foreground' }>
//             Pisos
//           </Link>
//         </NavbarItem>
//         <NavbarItem isActive={ isActive('/admin/employees') }>
//           <Link href="/admin/reservations" color={ isActive('/admin/reservations') ? 'secondary' : 'foreground' }>
//             Reservaciones
//           </Link>
//         </NavbarItem>
//         <NavbarItem isActive={ isActive('/admin/employees') }>
//           <Link href="/admin/orders" color={ isActive('/admin/orders') ? 'secondary' : 'foreground' }>
//             Ordenes
//           </Link>
//         </NavbarItem>
//         <NavbarItem isActive={ isActive('/admin/employees') }>
//           <Link href="/admin/reports" color={ isActive('/admin/reports') ? 'secondary' : 'foreground' }>
//             Reportes
//           </Link>
//         </NavbarI

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
            <Route path="/" element={ <DepartmentPage /> } />
            <Route path="create" element={ <CreateDepartment /> } />
            <Route path="edit/:id" element={ <UpdateDeparment /> } />
            <Route path="view/:id" element={ <ViewDepartment /> } />
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

        <Route path="*" element={ <Navigate to="/admin/dashboard" /> } />
      </Routes>
    </div>
  )
}
