import { Route, Routes } from 'react-router-dom'
import { Signin, Signup } from '../pages'

export const AuthRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="signin" element={ <Signin /> } />
        <Route path="signup" element={ <Signup /> } />
      </Routes>
    </div>
  )
}
