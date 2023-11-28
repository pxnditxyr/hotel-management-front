import { hotelApi } from '../../api'
import { IFloor, IServiceError } from '../../interfaces'
import { handlerServicesErrors } from '../../utils'

export interface ICreateFloor {
  name: string
  number: number
  detail: string
}

export class FloorsService {
  static findAll = async () : Promise<IFloor[] | IServiceError> => {
    try {
      const { data } = await hotelApi.get<IFloor[]>( '/floors' )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }

  static findOne = async ( id : string ) : Promise<IFloor | IServiceError> => {
    try {
      const { data } = await hotelApi.get<IFloor>( '/floors/' + id )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }

  static create = async ( category : ICreateFloor ) : Promise<IFloor | IServiceError> => {
    try {
      const { data } = await hotelApi.post<IFloor>( '/floors', category )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }

  static update = async ( id: string, category : ICreateFloor ) : Promise<IFloor | IServiceError> => {
    try {
      const { data } = await hotelApi.patch<IFloor>( '/floors/' + id, category )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }
  static toggleStatus = async ( id: string ) : Promise<IFloor | IServiceError> => {
    try {
      const { data } = await hotelApi.delete<IFloor>( '/floors/' + id )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }
}
