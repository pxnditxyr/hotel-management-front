import { StateCreator, create } from 'zustand'
import { IContactUs } from '../../../interfaces'
import { ContactUsService, ICreateContactUs } from '../../../services'

export interface IContactUssesState {
  contactUsess: IContactUs[]
  contactUs?: IContactUs | null
  isLoading: boolean
  error?: string

  findAll: () => Promise<void>
  findOne: ( id: string ) => Promise<void>
  create: ( contactUs: ICreateContactUs ) => Promise<void>
  clearError: () => void
}

const contactUsessStore : StateCreator<IContactUssesState> = ( set, get ) => ({
  contactUsess: [],
  contactUs: null,
  isLoading: false,
  error: undefined,

  findAll: async () => {
    set({ isLoading: true })
    const contactUsess = await ContactUsService.findAll()
    if ( 'error' in contactUsess ) set({ error: contactUsess.error })
    else set({ contactUsess })
    set({ isLoading: false })
  },
  findOne: async ( id: string ) => {
    set({ isLoading: true })
    const contactUs = await ContactUsService.findOne( id )
    if ( 'error' in contactUs ) set({ error: contactUs.error })
    else set({ contactUs })
    set({ isLoading: false })
  },
  create: async ( contactUs: ICreateContactUs ) => {
    set({ isLoading: true })
    const created = await ContactUsService.create( contactUs )
    if ( 'error' in created ) set({ error: created.error })
    else set({ contactUsess: [ ...get().contactUsess, created ] })
    set({ isLoading: false })
  },

  clearError: () => set({ error: undefined })
})

export const useContactUsStore = create<IContactUssesState>( contactUsessStore )
