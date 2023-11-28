import { StateCreator, create } from 'zustand'
import { IDepartment } from '../../../interfaces'
import { DepartmentsService, ICreateDepartment } from '../../../services'

export interface IDepartmentsState {
  departments: IDepartment[]
  department?: IDepartment | null
  isLoading: boolean
  error?: string

  findAll: () => Promise<void>
  findOne: ( id: string ) => Promise<void>
  create: ( department: ICreateDepartment ) => Promise<void>
  update: ( id: string, department: ICreateDepartment ) => Promise<void>
  toggleStatus: ( id: string ) => Promise<void>
  clearError: () => void
}

const departmentsStore : StateCreator<IDepartmentsState> = ( set, get ) => ({
  departments: [],
  department: null,
  isLoading: false,
  error: undefined,

  findAll: async () => {
    set({ isLoading: true })
    const departments = await DepartmentsService.findAll()
    if ( 'error' in departments ) set({ error: departments.error })
    else set({ departments })
    set({ isLoading: false })
    
  },

  findOne: async ( id: string ) => {
    set({ isLoading: true })
    const department = await DepartmentsService.findOne( id )
    if ( 'error' in department ) set({ error: department.error })
    else set({ department })
    set({ isLoading: false })
  },
  create: async ( department: ICreateDepartment ) => {
    set({ isLoading: true })
    const created = await DepartmentsService.create( department )
    if ( 'error' in created ) set({ error: created.error })
    else set({ departments: [ ...get().departments, created ] })
    set({ isLoading: false })
  },

  update: async ( id: string, department: ICreateDepartment ) => {
    set({ isLoading: true })
    const updated = await DepartmentsService.update( id, department )
    if ( 'error' in updated ) set({ error: updated.error })
    else set({ departments: get().departments.map( c => c.id === id ? updated : c ) })
    set({ isLoading: false })
  },

  toggleStatus: async ( id: string ) => {
    set({ isLoading: true })
    const updated = await DepartmentsService.toggleStatus( id )
    if ( 'error' in updated ) set({ error: updated.error })
    else set({ departments: get().departments.map( c => c.id === id ? updated : c ) })
    set({ isLoading: false })
  },

  clearError: () => set({ error: undefined })
})

export const useDepartmentsStore = create<IDepartmentsState>( departmentsStore )
