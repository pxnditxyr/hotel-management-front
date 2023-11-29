import { useNavigate } from 'react-router-dom'
import { PrivateModulesNavbar, PublicModulesNavbar } from '../../components'
import { useAuthStore } from '../../stores'
import { BackButton, LoadingPage } from '../../ui'

interface PublicPrivateModulesLayoutProps {
  children: JSX.Element | JSX.Element[]
  title?: string
  style?: React.CSSProperties
  darkBackground?: boolean
}

export const PublicPrivateModulesLayout = ( { children, title, style, darkBackground = false } : PublicPrivateModulesLayoutProps ) => {
  const status = useAuthStore( state => state.status )
  if ( status === 'pending' ) return ( <LoadingPage /> )
  const navigate = useNavigate()
  const onGoBack = () => navigate( -1 )

  return (
    <div className="flex flex-col min-h-screen w-full relative" style={{ ...style }}>
      {
        ( darkBackground ) && ( <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-0" /> )
      }
      {
        ( status === 'unauthenticated' )
          ? ( <PublicModulesNavbar /> )
          : ( <PrivateModulesNavbar /> )
      }
      <BackButton onGoBack={ onGoBack } />
      <div className="flex flex-col w-full px-8 py-12 items-center gap-12 z-10">
        <h1 className="text-4xl font-bold"> { title || 'Torre Nairobi' } </h1>
        { children }
      </div>
    </div>
  )
}
