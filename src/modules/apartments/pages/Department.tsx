import { useEffect } from 'react'
import { Button, Card, CardFooter, CardHeader, Image, Link } from '@nextui-org/react'
import { useAuthStore, useDepartmentsStore } from '../../../stores'
import { LoadingPage, UnexpectedError } from '../../../ui'
import { PublicPrivateModulesLayout } from '../../layout'
import { useLocation } from 'react-router-dom'

export const DepartmentById = () => {
  const location = useLocation()
  const id = location.pathname.split( '/' ).pop() as string
  const status = useAuthStore( state => state.status )
  const department = useDepartmentsStore( state => state.department )
  const findOneDepartment = useDepartmentsStore( state => state.findOne )
  const isLoadingDepartment = useDepartmentsStore( state => state.isLoading )
  const departmentError = useDepartmentsStore( state => state.error )

  useEffect( () => {
    findOneDepartment( id )
  }, [] )

  if ( status === 'pending' ) return ( <LoadingPage /> )
  if ( isLoadingDepartment ) return ( <LoadingPage /> )
  if ( departmentError ) return ( <UnexpectedError error={ departmentError } /> )
  if ( !department ) return ( <UnexpectedError error="Departamento no encontrado" /> )


  return (
    <PublicPrivateModulesLayout title={ `Departamento ${ department?.name }` }
      style={{
        backgroundImage: `url(${ department?.imageUrl })`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      darkBackground
    >
      <div className="w-full flex flex-col items-center gap-4 relative z-10">
        <div className="w-full flex flex-col items-center gap-4">
          <div className="rounded-lg shadow-lg p-4 w-full flex flex-wrap gap-8 justify-center items-center">
            <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7 max-w-[700px]" key={ department.id }>
              <CardHeader className="absolute z-10 top-0 flex-col items-start bg-black/70 w-auto font-bold">
                <p className="text-tiny text-white/60 uppercase font-bold"> Departamento </p>
                <h4 className="text-white/90 font-medium text-xl"> { department.name } </h4>
              </CardHeader>
              <Image
                removeWrapper
                alt="Relaxing app background"
                className="z-0 w-full h-full object-cover"
                src={ department.imageUrl }
              />
              <CardFooter className="absolute bg-black/70 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                  <Image
                    alt="Breathing app icon"
                    className="rounded-full w-10 h-11 bg-black"
                    src={ department.imageUrl }
                  />
                  <div className="flex flex-col">
                    <p className="text-sm text-white/60"> { department.detail } </p>
                  </div>
                </div>
                <Button
                  radius="full"
                  size="sm"
                  as={ Link }
                  href={ `${ status === 'authenticated' ? '/user/' : '/' }reservations/${ department.id }` }
                > Reservar </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </PublicPrivateModulesLayout>
  )
}
