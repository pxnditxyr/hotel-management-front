import { PublicLayout } from '../layout'

export const Contact = () => {
  return (
    <PublicLayout
      style={{
        backgroundImage: `url(/background_day_ver_1.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      title="Contactanos" 
      navClassName="bg-white bg-opacity-50 text-black text-md"
      linkClassName="text-md font-bold text-center"
    >
      
    </PublicLayout>
  )
}
