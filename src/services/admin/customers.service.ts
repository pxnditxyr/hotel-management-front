import { hotelApi } from '../../api'
import { ICustomer, IServiceError } from '../../interfaces'
import { handlerServicesErrors } from '../../utils'

export interface ICreateCustomer {
  dni: string
  name: string
  lastname: string
  phone: string
}

export class CustomersService {
  static findAll = async () : Promise<ICustomer[] | IServiceError> => {
    try {
      const { data } = await hotelApi.get<ICustomer[]>( '/customers' )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }

  static findOne = async ( id : string ) : Promise<ICustomer | IServiceError> => {
    try {
      const { data } = await hotelApi.get<ICustomer>( '/customers/' + id )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }

  static create = async ( category : ICreateCustomer ) : Promise<ICustomer | IServiceError> => {
    try {
      const { data } = await hotelApi.post<ICustomer>( '/customers', category )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }

  static update = async ( id: string, category : ICreateCustomer ) : Promise<ICustomer | IServiceError> => {
    try {
      const { data } = await hotelApi.patch<ICustomer>( '/customers/' + id, category )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }
  static toggleStatus = async ( id: string ) : Promise<ICustomer | IServiceError> => {
    try {
      const { data } = await hotelApi.delete<ICustomer>( '/customers/' + id )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }
}
