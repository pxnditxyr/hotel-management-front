import { Navbar } from '../../ui'

interface IProps {
  title: string
  children: JSX.Element | JSX.Element[]
}

const authLinks = [
  {
    name: 'Home',
    path: '/',
    image: '🏠'
  }
]

export const AuthLayout = ( { title, children } : IProps ) => {

  return (
    <div
      className="flex flex-col items-center min-h-screen h-full"
      style={ {
        backgroundImage: `url(/background_1.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } }
    >
      <div className="bg-black bg-opacity-60 w-full h-full absolute top-0 left-0 z-0"></div>
      <Navbar links={ authLinks } showSignInButton={ false } navClassName="text-gray-800 z-10" linkClassName="text-3xl" />
      <div className="flex flex-col items-center justify-center rounded-xl p-4 mt-4 z-10">
        <h1 className="text-4xl font-bold text-white" > { title } </h1>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full">
        {
          children
        }
      </div>
    </div>
  )
}
