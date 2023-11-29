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
      <div className="flex flex-row items-center justify-center h-full p-8 gap-12 bg-gray-800 bg-opacity-70 rounded-3xl mt-5">
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl font-bold text-center"> Nuevo Edificio Nairobi </h1>
          <img src="https://i.ibb.co/pzCcyM2/NAIROBI.jpg" alt="NAIROBI" />
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl font-bold text-center"> Ubicación </h1>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.601151626642!2d-68.1210971!3d-16.4957215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f21c9e5a67203%3A0x3c5c37613e14e09c!2sEdificio%20Torre%20Nairobi!5e0!3m2!1sen!2sbo!4v1701178713296!5m2!1sen!2sbo"
            width="600" height="450"
            style={{ border: 0 }}
            allowFullScreen={ true }
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-96"
          ></iframe>
        </div>
      </div>
 
    </PublicLayout>
  )
}
