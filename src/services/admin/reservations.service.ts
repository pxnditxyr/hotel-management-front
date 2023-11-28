import { hotelApi } from '../../api'
import { IReservation, IServiceError } from '../../interfaces'
import { handlerServicesErrors } from '../../utils'

export interface ICreateReservation {
  customerId: string
  departmentId: string
  startDate: string
  endDate: string
  monetaryAdvance: number
  paymentStatus: string
}

export class ReservationsService {
  static findAll = async () : Promise<IReservation[] | IServiceError> => {
    try {
      const { data } = await hotelApi.get<IReservation[]>( '/reservations' )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }

  static findOne = async ( id : string ) : Promise<IReservation | IServiceError> => {
    try {
      const { data } = await hotelApi.get<IReservation>( '/reservations/' + id )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }

  static create = async ( reservation : ICreateReservation ) : Promise<IReservation | IServiceError> => {
    try {
      const { data } = await hotelApi.post<IReservation>( '/reservations', reservation )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }

  static update = async ( id: string, reservation : ICreateReservation ) : Promise<IReservation | IServiceError> => {
    try {
      const { data } = await hotelApi.patch<IReservation>( '/reservations/' + id, reservation )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }
  static toggleStatus = async ( id: string ) : Promise<IReservation | IServiceError> => {
    try {
      const { data } = await hotelApi.delete<IReservation>( '/reservations/' + id )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }
}
