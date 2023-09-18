import { useEffect, useState } from 'react'
import { PublicLayout } from '../layout'

export const Home = () => {

  const [ backgroundIndex, setBackgroundIndex ] = useState( 1 )

  useEffect( () => {
    const changeBackground = () => {
      if ( backgroundIndex === 4 )
        setBackgroundIndex( 0 )
      else
        setBackgroundIndex( backgroundIndex + 1 )
    }
    const timeoutId = setTimeout( changeBackground, 4000 )
    return () => clearTimeout( timeoutId )
  }, [ backgroundIndex ] )

  return (
    <PublicLayout title="Torre Nairobi"
      style={{
        backgroundImage: `url(/background_${ backgroundIndex }.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      navClassName="bg-white bg-opacity-50 text-black text-md"
      linkClassName="text-md font-bold text-center"
    >
      
    </PublicLayout>
  )
}
