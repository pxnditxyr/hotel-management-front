import { Button, Card, CardFooter, CardHeader, Image } from '@nextui-org/react'
import { useAuthStore, useFloorsStore } from '../../../stores'
import { LoadingPage } from '../../../ui'
import { useEffect } from 'react'
import { PublicPrivateModulesLayout } from '../../layout'
import { useNavigate } from 'react-router-dom'

export const Apartments = () => {
  const status = useAuthStore( state => state.status )
  const floors = useFloorsStore( state => state.floors )
  const findAllFloors = useFloorsStore( state => state.findAll )
  const isLoadingFloors = useFloorsStore( state => state.isLoading )
  const navigate = useNavigate()
  const onGoFloor = ( id : string ) => {
    if ( status === 'unauthenticated' ) return navigate( `/apartments/${ id }` )
    navigate( `/user/apartments/${ id }` )
  }

  useEffect( () => {
    findAllFloors()
  }, [] )

  if ( status === 'pending' ) return ( <LoadingPage /> )
  if ( isLoadingFloors ) return ( <LoadingPage /> )



  return (
    <PublicPrivateModulesLayout title="Departamentos">
      <h2> Por favor seleccione el piso que desea ver </h2>
      <div className="flex flex-wrap gap-4">
        <div className="w-full flex flex-col items-center gap-4">
          <div className="rounded-lg shadow-lg p-4 w-full flex flex-wrap gap-8 justify-center items-center">
            { floors.filter( a => a.isActive ).map( ( floor ) => (
              <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7 max-w-[700px]" key={ floor.id }>
                <CardHeader className="absolute z-10 top-0 flex-col items-start bg-black/70 w-auto font-bold">
                  <p className="text-tiny text-white/60 uppercase font-bold"> Nombre del piso </p>
                  <h4 className="text-white/90 font-medium text-xl"> { floor.name } </h4>
                </CardHeader>
                <Image
                  removeWrapper
                  alt="Relaxing app background"
                  className="z-0 w-full h-full object-cover"
                  src={ floor.imageUrl }
                />
                <CardFooter className="absolute bg-black/70 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                  <div className="flex flex-grow gap-2 items-center">
                    <Image
                      alt="Breathing app icon"
                      className="rounded-full w-10 h-11 bg-black"
                      src={ floor.imageUrl }
                    />
                    <div className="flex flex-col">
                      <p className="text-sm text-white/60"> { floor.detail } </p>
                    </div>
                  </div>
                  <Button
                    radius="full"
                    size="sm"
                    onClick={ () => onGoFloor( floor.id ) }
                  > Ver departamentos </Button>
                </CardFooter>
              </Card>
            ) ) }
          </div>
        </div>
      </div>
    </PublicPrivateModulesLayout>
  )
}
