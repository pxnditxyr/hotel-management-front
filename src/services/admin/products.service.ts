import { hotelApi } from '../../api'
import { IProduct, IServiceError } from '../../interfaces'
import { handlerServicesErrors } from '../../utils'

export interface ICreateProduct {
  name: string
  price: number
  stock: number
  imageUrl: string
  categoryId: string
}

export class ProductsService {
  static findAll = async () : Promise<IProduct[] | IServiceError> => {
    try {
      const { data } = await hotelApi.get<IProduct[]>( '/products' )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }

  static findOne = async ( id : string ) : Promise<IProduct | IServiceError> => {
    try {
      const { data } = await hotelApi.get<IProduct>( '/products/' + id )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }

  static create = async ( category : ICreateProduct ) : Promise<IProduct | IServiceError> => {
    try {
      const { data } = await hotelApi.post<IProduct>( '/products', category )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }

  static update = async ( id: string, category : ICreateProduct ) : Promise<IProduct | IServiceError> => {
    try {
      const { data } = await hotelApi.patch<IProduct>( '/products/' + id, category )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }
  static toggleStatus = async ( id: string ) : Promise<IProduct | IServiceError> => {
    try {
      const { data } = await hotelApi.delete<IProduct>( '/products/' + id )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }
}
