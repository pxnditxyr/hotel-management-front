import { hotelApi } from '../../api'
import { IContactUs, IServiceError } from '../../interfaces'
import { handlerServicesErrors } from '../../utils'

export interface ICreateContactUs {
  name: string
  email: string
  message: string
}

export class ContactUsService {
  static findAll = async () : Promise<IContactUs[] | IServiceError> => {
    try {
      const { data } = await hotelApi.get<IContactUs[]>( '/contact' )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }

  static findOne = async ( id : string ) : Promise<IContactUs | IServiceError> => {
    try {
      const { data } = await hotelApi.get<IContactUs>( '/contact/' + id )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }

  static create = async ( contactUs : ICreateContactUs ) : Promise<IContactUs | IServiceError> => {
    try {
      const { data } = await hotelApi.post<IContactUs>( '/contact', contactUs )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }
}
