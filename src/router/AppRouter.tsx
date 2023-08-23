import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom'
import { PublicRoutes } from '../public'

export const AppRouter = () => {

  let status = 'not-authenticated'

  return (
    <BrowserRouter>
      <Routes>
        {
          ( status === 'not-authenticated' )
          ? (
            <Route path="/*" element={ <PublicRoutes /> } />
          )
          : (
            <Route path="/*" element={ <h1> Coming soon </h1> } />
          )
        }
      </Routes>
    </BrowserRouter>
  )
}
