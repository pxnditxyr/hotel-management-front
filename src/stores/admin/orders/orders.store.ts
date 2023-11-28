import { StateCreator, create } from 'zustand'
import { IOrder } from '../../../interfaces'
import { OrdersService, ICreateOrder } from '../../../services'

export interface IOrdersState {
  orders: IOrder[]
  order?: IOrder | null
  isLoading: boolean
  error?: string

  findAll: () => Promise<void>
  findOne: ( id: string ) => Promise<void>
  create: ( order: ICreateOrder ) => Promise<void>
  update: ( id: string, order: ICreateOrder ) => Promise<void>
  toggleStatus: ( id: string ) => Promise<void>
  clearError: () => void
}

const ordersStore : StateCreator<IOrdersState> = ( set, get ) => ({
  orders: [],
  order: null,
  isLoading: false,
  error: undefined,

  findAll: async () => {
    set({ isLoading: true })
    const orders = await OrdersService.findAll()
    if ( 'error' in orders ) set({ error: orders.error })
    else set({ orders })
    set({ isLoading: false })
    
  },

  findOne: async ( id: string ) => {
    set({ isLoading: true })
    const order = await OrdersService.findOne( id )
    if ( 'error' in order ) set({ error: order.error })
    else set({ order })
    set({ isLoading: false })
  },
  create: async ( order: ICreateOrder ) => {
    set({ isLoading: true })
    const created = await OrdersService.create( order )
    if ( 'error' in created ) set({ error: created.error })
    else set({ orders: [ ...get().orders, created ] })
    set({ isLoading: false })
  },

  update: async ( id: string, order: ICreateOrder ) => {
    set({ isLoading: true })
    const updated = await OrdersService.update( id, order )
    if ( 'error' in updated ) set({ error: updated.error })
    else set({ orders: get().orders.map( c => c.id === id ? updated : c ) })
    set({ isLoading: false })
  },

  toggleStatus: async ( id: string ) => {
    set({ isLoading: true })
    const updated = await OrdersService.toggleStatus( id )
    if ( 'error' in updated ) set({ error: updated.error })
    else set({ orders: get().orders.map( c => c.id === id ? updated : c ) })
    set({ isLoading: false })
  },

  clearError: () => set({ error: undefined })
})

export const useOrdersStore = create<IOrdersState>( ordersStore )
