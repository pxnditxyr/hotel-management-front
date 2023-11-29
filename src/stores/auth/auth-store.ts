import { StateCreator, create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthService } from '../../services'
import { IAuthUser, TAuthStatus } from '../../interfaces'

interface IAuthSignupParams {
  name: string
  email: string
  username: string
  password: string
  dni: string
  lastname: string
  phone: string
}

export interface IAuthState {
  status: TAuthStatus
  token?: string
  user?: IAuthUser
  error?: string

  signin: ( userTerm: string, password: string ) => Promise<void>
  signup: ( signupParams: IAuthSignupParams ) => Promise<void>
  checkAuthStatus: () => Promise<void>
  signout: () => void
  clearError: () => void
}

const storeApi : StateCreator<IAuthState> = ( set ) => ({
  status: 'pending',
  token: undefined,
  user: undefined,
  error: undefined,

  signin: async ( userTerm: string, password: string ) => {
    const response = await AuthService.signin( userTerm, password )
    if ( 'error' in response ) {
      set({ status: 'unauthenticated', token: undefined, user: undefined, error: response.error })
      return
    }
    const { token, user } = response
    set({ status: 'authenticated', token, user })
  },
  signup: async ( { name, email, username, password, dni, lastname, phone }: IAuthSignupParams ) => {
    const response = await AuthService.signup({ name, email, username, password, dni, lastname, phone })
    if ( 'error' in response ) {
      set({ status: 'unauthenticated', token: undefined, user: undefined, error: response.error })
      return
    }
    set({ status: 'authenticated', token: response.token, user: response.user })
  },

  checkAuthStatus: async () => {
    const response = await AuthService.checkAuthStatus()
    if ( 'error' in response ) {
      set({ status: 'unauthenticated', token: undefined, user: undefined })
      return
    }
    set({ status: 'authenticated', token: response.token, user: response.user })
  },
  signout: () => {
    set({ status: 'unauthenticated', token: undefined, user: undefined })
  },
  clearError: () => {
    set({ error: undefined })
  }
})

export const useAuthStore = create<IAuthState>()(
  persist(
    storeApi,
    { name: 'auth-store' }
  )
)
