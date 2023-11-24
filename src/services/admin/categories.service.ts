import { AxiosError } from 'axios'
import { hotelApi } from '../../api'
import { ICategory, IServiceError } from '../../interfaces'

interface ICreateCategory {
  name: string
}

export class CategoriesService {
  static findAll = async () : Promise<ICategory[] | IServiceError> => {
    try {
      const { data } = await hotelApi.get<ICategory[]>( '/categories' )
      return data
    } catch ( error ) {
      if ( error instanceof AxiosError ) return { error: error.response?.data }
      return { error: 'Ups, Algo salio mal' }
    }
  }

  static findOne = async ( id : string ) : Promise<ICategory | IServiceError> => {
    try {
      const { data } = await hotelApi.get<ICategory>( '/categories/' + id )
      return data
    } catch ( error ) {
      if ( error instanceof AxiosError ) return { error: error.response?.data }
      return { error: 'Ups, Algo salio mal' }
    }
  }

  static create = async ( category : ICreateCategory ) : Promise<ICategory | IServiceError> => {
    try {
      const { data } = await hotelApi.post<ICategory>( '/categories', category )
      return data
    } catch ( error ) {
      if ( error instanceof AxiosError )
        return  { error: error.response?.data }
      return { error: 'Ups, Algo salio mal' }
    }
  }

  static update = async ( id: string, category : ICreateCategory ) : Promise<ICategory | IServiceError> => {
    try {
      const { data } = await hotelApi.patch<ICategory>( '/categories/' + id, category )
      return data
    } catch ( error ) {
      if ( error instanceof AxiosError ) return { error: error.response?.data }
      console.log( error )
      throw new Error( 'Ups, Algo salio mal' )
    }
  }
  static toggleStatus = async ( id: string ) : Promise<ICategory | IServiceError> => {
    try {
      const { data } = await hotelApi.put<ICategory>( '/categories/' + id + '/toggle-status' )
      return data
    } catch ( error ) {
      if ( error instanceof AxiosError ) return { error: error.response?.data }
      return { error: 'Ups, Algo salio mal' }
    }
  }
}
