import { StateCreator, create } from 'zustand'
import { IProduct } from '../../../interfaces'
import { ProductsService, ICreateProduct } from '../../../services'

export interface IProductsState {
  products: IProduct[]
  product?: IProduct | null
  isLoading: boolean
  error?: string

  findAll: () => Promise<void>
  findOne: ( id: string ) => Promise<void>
  create: ( product: ICreateProduct ) => Promise<void>
  update: ( id: string, product: ICreateProduct ) => Promise<void>
  toggleStatus: ( id: string ) => Promise<void>
  clearError: () => void
}

const productsStore : StateCreator<IProductsState> = ( set, get ) => ({
  products: [],
  product: null,
  isLoading: false,
  error: undefined,

  findAll: async () => {
    set({ isLoading: true })
    const products = await ProductsService.findAll()
    if ( 'error' in products ) set({ error: products.error })
    else set({ products })
    set({ isLoading: false })
    
  },

  findOne: async ( id: string ) => {
    set({ isLoading: true })
    const product = await ProductsService.findOne( id )
    if ( 'error' in product ) set({ error: product.error })
    else set({ product })
    set({ isLoading: false })
  },
  create: async ( product: ICreateProduct ) => {
    set({ isLoading: true })
    const created = await ProductsService.create( product )
    if ( 'error' in created ) set({ error: created.error })
    else set({ products: [ ...get().products, created ] })
    set({ isLoading: false })
  },

  update: async ( id: string, product: ICreateProduct ) => {
    set({ isLoading: true })
    const updated = await ProductsService.update( id, product )
    if ( 'error' in updated ) set({ error: updated.error })
    else set({ products: get().products.map( c => c.id === id ? updated : c ) })
    set({ isLoading: false })
  },

  toggleStatus: async ( id: string ) => {
    set({ isLoading: true })
    const updated = await ProductsService.toggleStatus( id )
    if ( 'error' in updated ) set({ error: updated.error })
    else set({ products: get().products.map( c => c.id === id ? updated : c ) })
    set({ isLoading: false })
  },

  clearError: () => set({ error: undefined })
})

export const useProductsStore = create<IProductsState>( productsStore )
