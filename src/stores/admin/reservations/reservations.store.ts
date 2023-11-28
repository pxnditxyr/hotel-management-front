import { StateCreator, create } from 'zustand'
import { IReservation } from '../../../interfaces'
import { ReservationsService, ICreateReservation } from '../../../services'

export interface IReservationsState {
  reservations: IReservation[]
  reservation?: IReservation | null
  isLoading: boolean
  error?: string

  findAll: () => Promise<void>
  findOne: ( id: string ) => Promise<void>
  create: ( reservation: ICreateReservation ) => Promise<void>
  update: ( id: string, reservation: ICreateReservation ) => Promise<void>
  toggleStatus: ( id: string ) => Promise<void>
  clearError: () => void
}

const reservationsStore : StateCreator<IReservationsState> = ( set, get ) => ({
  reservations: [],
  reservation: null,
  isLoading: false,
  error: undefined,

  findAll: async () => {
    set({ isLoading: true })
    const reservations = await ReservationsService.findAll()
    if ( 'error' in reservations ) set({ error: reservations.error })
    else set({ reservations })
    set({ isLoading: false })
    
  },

  findOne: async ( id: string ) => {
    set({ isLoading: true })
    const reservation = await ReservationsService.findOne( id )
    if ( 'error' in reservation ) set({ error: reservation.error })
    else set({ reservation })
    set({ isLoading: false })
  },
  create: async ( reservation: ICreateReservation ) => {
    set({ isLoading: true })
    const created = await ReservationsService.create( reservation )
    if ( 'error' in created ) set({ error: created.error })
    else set({ reservations: [ ...get().reservations, created ] })
    set({ isLoading: false })
  },

  update: async ( id: string, reservation: ICreateReservation ) => {
    set({ isLoading: true })
    const updated = await ReservationsService.update( id, reservation )
    if ( 'error' in updated ) set({ error: updated.error })
    else set({ reservations: get().reservations.map( c => c.id === id ? updated : c ) })
    set({ isLoading: false })
  },

  toggleStatus: async ( id: string ) => {
    set({ isLoading: true })
    const updated = await ReservationsService.toggleStatus( id )
    if ( 'error' in updated ) set({ error: updated.error })
    else set({ reservations: get().reservations.map( c => c.id === id ? updated : c ) })
    set({ isLoading: false })
  },

  clearError: () => set({ error: undefined })
})

export const useReservationsStore = create<IReservationsState>( reservationsStore )
