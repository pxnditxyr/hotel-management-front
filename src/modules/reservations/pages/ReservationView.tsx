import { FormEvent, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore, useDepartmentsStore, useReservationsStore } from '../../../stores'
import { LoadingPage, UnexpectedError } from '../../../ui'
import { PublicPrivateModulesLayout } from '../../layout'
import { Button, Chip, Link, Input } from '@nextui-org/react'
import { IReservation } from '../../../interfaces'
import Swal from 'sweetalert2'

export const ReservationView = () => {

  const location = useLocation()
  const id = location.pathname.split( '/' ).pop() as string
  const navigate = useNavigate()
  const status = useAuthStore( state => state.status )
  const user = useAuthStore( state => state.user )
  const department = useDepartmentsStore( state => state.department )
  const findOneDepartment = useDepartmentsStore( state => state.findOne )
  const isLoadingDepartment = useDepartmentsStore( state => state.isLoading )
  const [ showForm, setShowForm ] = useState<boolean>( false )

  const create = useReservationsStore( state => state.create )
  const error = useReservationsStore( state => state.error )
  const isLoadingReservation = useReservationsStore( state => state.isLoading )
  const clearError = useReservationsStore( state => state.clearError )

  const checkIsAvailable = ( reservation : IReservation ) => {
    const today = new Date()
    const reservationStartDate = new Date( reservation.startDate )
    const reservationEndDate = new Date( reservation.endDate )
    return ( today >= reservationStartDate && today <= reservationEndDate ) && reservation.isActive
  }

  const onSubmit = ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const { startDate, endDate, monetaryAdvance, paymentStatus } = event.target as HTMLFormElement
    create({
      customerId: user?.id || '',
      departmentId: department?.id || '',
      startDate: startDate.value,
      endDate: endDate.value,
      monetaryAdvance: Number( monetaryAdvance.value ),
      paymentStatus: paymentStatus.value
    })
    if ( !error ) {
      Swal.fire( {
        title: 'Reservacion creada con exito',
        icon: 'success',
        confirmButtonText: 'Ok'
      } )
      setShowForm( false )
      navigate( '/user/reservations' )
    }
  }

  useEffect( () => {
    if ( error ) {
      Swal.fire( {
        title: 'Error al crear la reservacion',
        text: error,
        icon: 'error',
        confirmButtonText: 'Ok'
      } )
      clearError()
    }
  }, [ error, clearError ] )

  useEffect( () => {
    findOneDepartment( id )
  }, [] )

  if ( isLoadingDepartment ) return ( <LoadingPage /> )
  if ( isLoadingReservation ) return ( <LoadingPage /> )
  if ( !department ) return ( <UnexpectedError /> )
  if ( status === 'pending' ) return ( <LoadingPage /> )



  return (
    <PublicPrivateModulesLayout title="Reservaciones">
      <div className="flex flex-wrap w-full px-8 py-12 items-center justify-center gap-12">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img className="p-8 rounded-t-lg" src={ department.imageUrl } alt={ department.name } />
          </a>
          <div className="px-5 pb-5">
            <a href="#">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"> { department.name } </h5>
            </a>
            <div className="flex items-center mt-2.5 mb-5">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white"> { department.price } Bs. </span>
              {
                ( status === 'authenticated' ) ? (
                  ( department.reservations.filter( ( reservation ) => { return checkIsAvailable( reservation ) } ).length > 0  || !department.isActive )
                    ? (
                      <Button color="danger" disabled>
                        Reservar
                      </Button>
                    )
                    : (
                      <Button color="success" onClick={ () => setShowForm( true ) }>
                        Reservar
                      </Button>
                    )
                ) : (
                  <Button color="success" as={ Link } href="/auth/signin">
                    Iniciar sesión
                  </Button>
                )
              }
            </div>
            <div className="flex flex-col mt-4 text-gray-700 dark:text-gray-200 gap-2">
              <p className="text-lg"><span className="font-bold"> Categoria: </span> { department.departmentCategory?.name } </p>
              <p className="text-lg"><span className="font-bold"> Piso: </span>{ department.floor?.name  } </p>
              <p className="text-lg flex items-center gap-4"><span className="font-bold"> Estado: </span>
                {
                  ( department.reservations.filter( ( reservation ) => { return checkIsAvailable( reservation ) } ).length > 0 || !department.isActive )
                    ? ( <Chip color="danger"> Ocupado </Chip> )
                    : ( <Chip color="success"> Disponible </Chip> )
                }
              </p>
              <p className="text-lg overflow-hidden ellipsis whitespace-nowrap overflow-ellipsis"><span className="font-bold"> Detalles: </span> { department.detail } </p>
            </div>
          </div>
        </div>
        {
          ( showForm ) && (
            <form
              className="flex flex-col gap-8 w-1/2 lg:w-1/4"
              onSubmit={ onSubmit }
            >
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                  type="date"
                  name="startDate"
                  label="Fecha de inicio"
                  placeholder="Fecha de inicio"
                  defaultValue={ new Date().toISOString().split( 'T' )[ 0 ] }
                />
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                  type="date"
                  name="endDate"
                  label="Fecha de fin"
                  placeholder="Fecha de fin"
                  defaultValue={ new Date( Date.now() + 86400000 ).toISOString().split( 'T' )[ 0 ] }
                />
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                  type="text" 
                  name="monetaryAdvance"
                  label="Adelanto"
                />
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                  type="text" 
                  name="paymentStatus"
                  label="Estado de pago"
                />
              </div>
              <Button color="success" className="w-full" type="submit"> Reservar </Button>
            </form>
          )

        }
      </div>
    </PublicPrivateModulesLayout>
  )
}
