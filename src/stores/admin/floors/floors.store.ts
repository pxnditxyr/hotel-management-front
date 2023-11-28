import { StateCreator, create } from 'zustand'
import { IFloor } from '../../../interfaces'
import { FloorsService, ICreateFloor } from '../../../services'

export interface IFloorsState {
  floors: IFloor[]
  floor?: IFloor | null
  isLoading: boolean
  error?: string

  findAll: () => Promise<void>
  findOne: ( id: string ) => Promise<void>
  create: ( floor: ICreateFloor ) => Promise<void>
  update: ( id: string, floor: ICreateFloor ) => Promise<void>
  toggleStatus: ( id: string ) => Promise<void>
  clearError: () => void
}

const floorsStore : StateCreator<IFloorsState> = ( set, get ) => ({
  floors: [],
  floor: null,
  isLoading: false,
  error: undefined,

  findAll: async () => {
    set({ isLoading: true })
    const floors = await FloorsService.findAll()
    if ( 'error' in floors ) set({ error: floors.error })
    else set({ floors })
    set({ isLoading: false })
    
  },

  findOne: async ( id: string ) => {
    set({ isLoading: true })
    const floor = await FloorsService.findOne( id )
    if ( 'error' in floor ) set({ error: floor.error })
    else set({ floor })
    set({ isLoading: false })
  },
  create: async ( floor: ICreateFloor ) => {
    set({ isLoading: true })
    const created = await FloorsService.create( floor )
    if ( 'error' in created ) set({ error: created.error })
    else set({ floors: [ ...get().floors, created ] })
    set({ isLoading: false })
  },

  update: async ( id: string, floor: ICreateFloor ) => {
    set({ isLoading: true })
    const updated = await FloorsService.update( id, floor )
    if ( 'error' in updated ) set({ error: updated.error })
    else set({ floors: get().floors.map( c => c.id === id ? updated : c ) })
    set({ isLoading: false })
  },

  toggleStatus: async ( id: string ) => {
    set({ isLoading: true })
    const updated = await FloorsService.toggleStatus( id )
    if ( 'error' in updated ) set({ error: updated.error })
    else set({ floors: get().floors.map( c => c.id === id ? updated : c ) })
    set({ isLoading: false })
  },

  clearError: () => set({ error: undefined })
})

export const useFloorsStore = create<IFloorsState>( floorsStore )
