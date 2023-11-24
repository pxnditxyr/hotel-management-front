import { hotelApi } from '../../api'
import { ICategory, IServiceError } from '../../interfaces'
import { handlerServicesErrors } from '../../utils'

interface ICreateCategory {
  name: string
}

export class CategoriesService {
  static findAll = async () : Promise<ICategory[] | IServiceError> => {
    try {
      const { data } = await hotelApi.get<ICategory[]>( '/categories' )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }

  static findOne = async ( id : string ) : Promise<ICategory | IServiceError> => {
    try {
      const { data } = await hotelApi.get<ICategory>( '/categories/' + id )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }

  static create = async ( category : ICreateCategory ) : Promise<ICategory | IServiceError> => {
    try {
      const { data } = await hotelApi.post<ICategory>( '/categories', category )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }

  static update = async ( id: string, category : ICreateCategory ) : Promise<ICategory | IServiceError> => {
    try {
      const { data } = await hotelApi.patch<ICategory>( '/categories/' + id, category )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }
  static toggleStatus = async ( id: string ) : Promise<ICategory | IServiceError> => {
    try {
      const { data } = await hotelApi.delete<ICategory>( '/categories/' + id )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }
}
