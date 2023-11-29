import { Button } from '@nextui-org/react'
import { useAuthStore } from '../../../stores'
import { PublicPrivateModulesLayout } from '../../layout'

export const UserMainPage = () => {

  const user = useAuthStore( state => state.user )
  const onSignOut = useAuthStore( state => state.signout )

  return (
    <PublicPrivateModulesLayout>
      <div className="flex flex-col items-center justify-center gap-4 p-12">
        <h1 className="text-2xl font-bold text-center text-gray-700" > Bienvenido { user?.name } </h1>
        <h2 className="text-xl font-bold text-center text-gray-700" > Email: { user?.email } </h2>
        <h3 className="text-lg font-bold text-center text-gray-700" > Tu Rol: { user?.role } </h3>
        <Button color="danger" onClick={ onSignOut }>
          Cerrar sesión
        </Button>  
      </div>
    </PublicPrivateModulesLayout>
  )
}
