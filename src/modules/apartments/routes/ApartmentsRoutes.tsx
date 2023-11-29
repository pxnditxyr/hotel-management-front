import { Route, Routes } from 'react-router-dom'
import { Apartments } from '../pages'
import { DepartmentsInFloor } from '../pages/DepartmentsInFloor'
import { DepartmentById } from '../pages/Department'

export const ApartmentsRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <Apartments /> } />
        <Route path=":id" element={ <DepartmentsInFloor /> } />
        <Route path="department/:id" element={ <DepartmentById /> } />
        <Route path="*" element={ <Apartments /> } />
      </Routes>
    </div>
  )
}
