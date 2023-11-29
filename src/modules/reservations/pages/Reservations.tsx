import { useEffect } from 'react'
import { Button, Card, CardFooter, CardHeader, Image, Link } from '@nextui-org/react'
import { useAuthStore, useDepartmentsStore } from '../../../stores'
import { LoadingPage } from '../../../ui'
import { PublicPrivateModulesLayout } from '../../layout'

export const Reservations = () => {
  const status = useAuthStore( state => state.status )
  const departments = useDepartmentsStore( state => state.departments )
  const findAllDepartments = useDepartmentsStore( state => state.findAll )

  useEffect( () => {
    findAllDepartments()
  }, [] )

  if ( status === 'pending' ) return ( <LoadingPage /> )

  return (
    <PublicPrivateModulesLayout title="Reservaciones">
      <div className="flex flex-wrap gap-8 justify-center w-full">
        {
          departments.filter( a => a.isActive ).map( department => (
            <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5 max-w-[500px] relative" key={ department.id }>
              <CardHeader className="absolute z-10 top-1 flex-col items-start gap-2 bg-white/60 w-auto font-bold">
                <p className="text-tiny text-gray-800 uppercase font-bold"> { department.floor?.name } </p>
                <h4 className="text-gray-800 text-2xl font-bold"> { department.name } </h4>
              </CardHeader>
              <Image
                removeWrapper
                alt="Card example background"
                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                src={ department.imageUrl }
              />
              <CardFooter className="absolute bg-white/60 bottom-0 border-t-1 border-zinc-900/10 z-10 justify-between">
                <div>
                  <p className="text-black text-tiny"> { department.detail } </p>
                  <p className="text-black text-tiny"> Precio: { department.price } </p>
                </div>
                <Button
                  as={ Link }
                  href={ `${ status === 'authenticated' ? '/user/' : '/' }reservations/${ department.id }` }
                  className="text-tiny" color="primary" radius="full" size="sm">
                  Reservar
                </Button>
              </CardFooter>
            </Card>
          ) )
        }
      </div>
    </PublicPrivateModulesLayout>
  )
}
