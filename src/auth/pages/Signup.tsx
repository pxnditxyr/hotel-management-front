import { Link } from 'react-router-dom'
import { AuthLayout } from '../layout/AuthLayout'
import { FormEvent, useEffect } from 'react'

import Swal from 'sweetalert2'
import { useAuthStore } from '../../stores'


const inputClassName = "w-96 px-4 py-2 rounded-xl border-2 border-gray-300 bg-transparent focus:outline-none focus:border-sky-500 text-white font-bold z-10"

export const Signup = () => {

  const signup = useAuthStore( state => state.signup )
  const error = useAuthStore( state => state.error )

  const onSubmit = ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const {
      userName, email, username, dni,
      lastname, phone, password, passwordConfirm
    } = event.target as HTMLFormElement
    if ( password.value !== passwordConfirm.value ) {
      Swal.fire({
        icon: 'error',
        title: 'Las contraseñas no coinciden',
        text: 'Por favor verifica que las contraseñas coincidan',
      })
    }
    signup({ 
      name: userName.value,
      email: email.value,
      username: username.value,
      dni: dni.value,
      lastname: lastname.value,
      phone: phone.value,
      password: password.value,
    })
  }

  useEffect( () => {
    if ( error ) {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrarse',
        text: error,
      })
    }
  }, [ error ])

  return (
    <AuthLayout title="Registrate">
      <div className="flex items-center justify-center rounded-lg mt-4 z-10 py-4 px-8 h-full gap-12">
        <div className="flex flex-col items-center justify-center rounded-xl max-w-xl w-full">
          <div className="h-96 w-96 rounded-xl"
            style={{
              backgroundImage: `url(/background_day_ver_2.png)`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <form
            className="flex flex-col items-center justify-center p-4 gap-8"
            onSubmit={ onSubmit }
          >
            <input
              type="text"
              name="userName"
              placeholder="Nombre"
              className={ inputClassName }
              required
            />
            <input
              type="text"
              name="lastname"
              placeholder="Apellido"
              className={ inputClassName }
              required
            />
            <input
              type="text"
              name="dni"
              placeholder="DNI"
              className={ inputClassName }
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Teléfono"
              className={ inputClassName }
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Nombre de usuario"
              className={ inputClassName }
              required
            />
            <input
              type="text"
              name="email"
              placeholder="Correo electrónico"
              className={ inputClassName }
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className={ inputClassName }
              required
            />
            <input
              type="password"
              name="passwordConfirm"
              placeholder="Confirmar contraseña"
              className={ inputClassName }
              required
            />
            <button className="px-4 py-2 rounded-xl bg-sky-500 text-white font-bold z-10" > Registrate </button>
            
          </form>
          <Link to="/auth/signin" className="text-white font-bold text-lg hover:underline z-10" > ¿Ya tienes una cuenta? Inicia sesión </Link>
        </div>
      </div>
    </AuthLayout>
  )
}
