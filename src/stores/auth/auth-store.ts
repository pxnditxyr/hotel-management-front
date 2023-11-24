import { StateCreator, create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthService } from '../../services'
import { IAuthUser, TAuthStatus } from '../../interfaces'

export interface IAuthState {
  status: TAuthStatus
  token?: string
  user?: IAuthUser

  signin: ( userTerm: string, password: string ) => Promise<void>
  checkAuthStatus: () => Promise<void>
  signout: () => void
}

const storeApi : StateCreator<IAuthState> = ( set ) => ({
  status: 'pending',
  token: undefined,
  user: undefined,

  signin: async ( userTerm: string, password: string ) => {
    try {
      const { user, token } = await AuthService.signin( userTerm, password )
      set({ status: 'authenticated', token, user })
    } catch ( error ) {
      set({ status: 'unauthenticated', token: undefined, user: undefined })
      throw error
    }
  },

  checkAuthStatus: async () => {
    try {
      const { token, user } = await AuthService.checkAuthStatus()
      set({ status: 'authenticated', token, user })
    } catch ( error ) {
      set({ status: 'unauthenticated', token: undefined, user: undefined })
    }
  },
  signout: () => {
    set({ status: 'unauthenticated', token: undefined, user: undefined })
  }
})

export const useAuthStore = create<IAuthState>()(
  persist(
    storeApi,
    { name: 'auth-store' }
  )
)
