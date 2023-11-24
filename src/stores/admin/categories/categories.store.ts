import { StateCreator, create } from 'zustand'
import { ICategory } from '../../../interfaces'
import { CategoriesService } from '../../../services'

export interface ICategoriesState {
  categories: ICategory[]
  category?: ICategory
  isLoading: boolean
  error?: string

  findAll: () => Promise<void>
  findOne: ( id: string ) => Promise<void>
  create: ( category: ICategory ) => Promise<void>
  update: ( id: string, category: ICategory ) => Promise<void>
  toggleStatus: ( id: string ) => Promise<void>
}

const categoriesStore : StateCreator<ICategoriesState> = ( set, get ) => ({
  categories: [],
  category: undefined,
  isLoading: false,
  error: undefined,

  findAll: async () => {
    set({ isLoading: true })
    const categories = await CategoriesService.findAll()
    if ( 'error' in categories ) set({ error: categories.error })
    else set({ categories })
    set({ isLoading: false })
  },

  findOne: async ( id: string ) => {
    set({ isLoading: true })
    const category = await CategoriesService.findOne( id )
    if ( 'error' in category ) set({ error: category.error })
    else set({ category })
    set({ isLoading: false })
  },
  create: async ( category: ICategory ) => {
    set({ isLoading: true })
    const created = await CategoriesService.create( category )
    if ( 'error' in created ) set({ error: created.error })
    else set({ categories: [ ...get().categories, created ] })
    set({ isLoading: false })
  },

  update: async ( id: string, category: ICategory ) => {
    set({ isLoading: true })
    const updated = await CategoriesService.update( id, category )
    if ( 'error' in updated ) set({ error: updated.error })
    else set({ categories: get().categories.map( c => c.id === id ? updated : c ) })
    set({ isLoading: false })
  },

  toggleStatus: async ( id: string ) => {
    set({ isLoading: true })
    const updated = await CategoriesService.toggleStatus( id )
    if ( 'error' in updated ) set({ error: updated.error })
    else set({ categories: get().categories.map( c => c.id === id ? updated : c ) })
    set({ isLoading: false })
  }
})

export const useCategoriesStore = create<ICategoriesState>( categoriesStore )
