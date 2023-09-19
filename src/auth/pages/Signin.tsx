import { Link } from 'react-router-dom'
import { AuthLayout } from '../layout/AuthLayout'


const inputClassName = "w-96 px-4 py-2 rounded-xl border-2 border-gray-300 bg-transparent focus:outline-none focus:border-sky-500 text-white font-bold z-10"

export const Signin = () => {
  return (
    <AuthLayout title="Iniciar sesión">
      <div className="flex items-center justify-center rounded-lg mt-4 z-10 py-4 px-8 h-full gap-12">
        <div className="flex flex-col items-center justify-center rounded-xl max-w-xl w-full">
          <div className="h-96 w-96 rounded-xl"
            style={{
              backgroundImage: `url(/background_day_ver_1.png)`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <form className="flex flex-col items-center justify-center p-4 gap-8">
            <input
              type="text"
              placeholder="Correo electrónico"
              className={ inputClassName }
            />
            <input
              type="password"
              placeholder="Contraseña"
              className={ inputClassName }
            />
            <button className="px-4 py-2 rounded-xl bg-sky-500 text-white font-bold z-10" > Iniciar sesión </button>
            
          </form>
          <Link to="/auth/signup" className="text-white font-bold text-lg hover:underline z-10" > ¿No tienes una cuenta? Regístrate </Link>
        </div>
      </div>
    </AuthLayout>
  )
}
