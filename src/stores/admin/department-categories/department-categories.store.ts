import { StateCreator, create } from 'zustand'
import { IDepartmentCategory } from '../../../interfaces'
import { DepartmentCategoriesService, ICreateDepartmentCategory } from '../../../services'

export interface IDepartmentCategoriesState {
  departmentCategories: IDepartmentCategory[]
  departmentCategory?: IDepartmentCategory
  isLoading: boolean
  error?: string

  findAll: () => Promise<void>
  findOne: ( id: string ) => Promise<void>
  create: ( departmentCategory: ICreateDepartmentCategory ) => Promise<void>
  update: ( id: string, departmentCategory: ICreateDepartmentCategory ) => Promise<void>
  toggleStatus: ( id: string ) => Promise<void>
  clearError: () => void
}

const departmentCategoriesStore : StateCreator<IDepartmentCategoriesState> = ( set, get ) => ({
  departmentCategories: [],
  departmentCategory: undefined,
  isLoading: false,
  error: undefined,

  findAll: async () => {
    set({ isLoading: true })
    const departmentCategories = await DepartmentCategoriesService.findAll()
    if ( 'error' in departmentCategories ) set({ error: departmentCategories.error })
    else set({ departmentCategories })
    set({ isLoading: false })
  },

  findOne: async ( id: string ) => {
    set({ isLoading: true })
    const departmentCategory = await DepartmentCategoriesService.findOne( id )
    if ( 'error' in departmentCategory ) set({ error: departmentCategory.error })
    else set({ departmentCategory })
    set({ isLoading: false })
  },
  create: async ( departmentCategory: ICreateDepartmentCategory ) => {
    set({ isLoading: true })
    const created = await DepartmentCategoriesService.create( departmentCategory )
    if ( 'error' in created ) set({ error: created.error })
    else set({ departmentCategories: [ ...get().departmentCategories, created ] })
    set({ isLoading: false })
  },

  update: async ( id: string, departmentCategory: ICreateDepartmentCategory ) => {
    set({ isLoading: true })
    const updated = await DepartmentCategoriesService.update( id, departmentCategory )
    if ( 'error' in updated ) set({ error: updated.error })
    else set({ departmentCategories: get().departmentCategories.map( c => c.id === id ? updated : c ) })
    set({ isLoading: false })
  },

  toggleStatus: async ( id: string ) => {
    set({ isLoading: true })
    const updated = await DepartmentCategoriesService.toggleStatus( id )
    if ( 'error' in updated ) set({ error: updated.error })
    else set({ departmentCategories: get().departmentCategories.map( c => c.id === id ? updated : c ) })
    set({ isLoading: false })
  },

  clearError: () => set({ error: undefined })
})

export const useDepartmentCategoriesStore = create<IDepartmentCategoriesState>( departmentCategoriesStore )
