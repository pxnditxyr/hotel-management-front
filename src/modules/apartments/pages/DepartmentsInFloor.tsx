import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Card, CardFooter, CardHeader, Image, Link } from '@nextui-org/react'
import { useAuthStore, useFloorsStore } from '../../../stores'
import { LoadingPage, UnexpectedError } from '../../../ui'
import { PublicPrivateModulesLayout } from '../../layout'

export const DepartmentsInFloor = () => {

  const location = useLocation()
  const id = location.pathname.split( '/' ).pop() as string
  const status = useAuthStore( state => state.status )
  const floor = useFloorsStore( state => state.floor )
  const findOneFloor = useFloorsStore( state => state.findOne )
  const isLoadingFloor = useFloorsStore( state => state.isLoading )
  const floorError = useFloorsStore( state => state.error )

  useEffect( () => {
    findOneFloor( id )
  }, [] )

  if ( status === 'pending' ) return ( <LoadingPage /> )
  if ( isLoadingFloor ) return ( <LoadingPage /> )
  if ( floorError ) return ( <UnexpectedError error={ floorError } /> )


  return (
    <PublicPrivateModulesLayout title={ `Piso ${ floor?.number }` }
      style={ {
        backgroundImage: `url(${ floor?.imageUrl })`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } }
    >
      <div className="w-full flex flex-col items-center gap-4 relative" >
        <div className="w-full flex flex-col items-center gap-4">
          <div className="rounded-lg shadow-lg p-4 w-full flex flex-wrap gap-8 justify-center items-center">
            { floor?.departments?.filter( a => a.isActive ).map( ( department ) => (
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
                    color="primary"
                    as={ Link }
                    href={ `${ status === 'authenticated' ? '/user/' : '/' }apartments/department/${ department.id }` }
                  > Ver </Button>
                </CardFooter>
              </Card>
            ) ) }
          </div>
        </div>
      </div>
    </PublicPrivateModulesLayout>
  )
}
