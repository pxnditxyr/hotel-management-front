import { StateCreator, create } from 'zustand'
import { ICustomer } from '../../../interfaces'
import { CustomersService, ICreateCustomer } from '../../../services'

export interface ICustomersState {
  customers: ICustomer[]
  customer?: ICustomer | null
  isLoading: boolean
  error?: string

  findAll: () => Promise<void>
  findOne: ( id: string ) => Promise<void>
  create: ( customer: ICreateCustomer ) => Promise<void>
  update: ( id: string, customer: ICreateCustomer ) => Promise<void>
  toggleStatus: ( id: string ) => Promise<void>
  clearError: () => void
}

const customersStore : StateCreator<ICustomersState> = ( set, get ) => ({
  customers: [],
  customer: null,
  isLoading: false,
  error: undefined,

  findAll: async () => {
    set({ isLoading: true })
    const customers = await CustomersService.findAll()
    if ( 'error' in customers ) set({ error: customers.error })
    else set({ customers })
    set({ isLoading: false })
  },

  findOne: async ( id: string ) => {
    set({ isLoading: true })
    const customer = await CustomersService.findOne( id )
    if ( 'error' in customer ) set({ error: customer.error })
    else set({ customer })
    set({ isLoading: false })
  },
  create: async ( customer: ICreateCustomer ) => {
    set({ isLoading: true })
    const created = await CustomersService.create( customer )
    if ( 'error' in created ) set({ error: created.error })
    else set({ customers: [ ...get().customers, created ] })
    set({ isLoading: false })
  },

  update: async ( id: string, customer: ICreateCustomer ) => {
    set({ isLoading: true })
    const updated = await CustomersService.update( id, customer )
    if ( 'error' in updated ) set({ error: updated.error })
    else set({ customers: get().customers.map( c => c.id === id ? updated : c ) })
    set({ isLoading: false })
  },

  toggleStatus: async ( id: string ) => {
    set({ isLoading: true })
    const updated = await CustomersService.toggleStatus( id )
    if ( 'error' in updated ) set({ error: updated.error })
    else set({ customers: get().customers.map( c => c.id === id ? updated : c ) })
    set({ isLoading: false })
  },

  clearError: () => set({ error: undefined })
})

export const useCustomersStore = create<ICustomersState>( customersStore )
