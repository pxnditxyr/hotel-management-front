import { hotelApi } from '../../api'
import { IDepartment, IServiceError } from '../../interfaces'
import { handlerServicesErrors } from '../../utils'

export interface ICreateDepartment {
  name: string
  number: number
  detail: string
  price: number
  floorId: string
  departmentCategoryId: string
  imageUrl: string
}

export class DepartmentsService {
  static findAll = async () : Promise<IDepartment[] | IServiceError> => {
    try {
      const { data } = await hotelApi.get<IDepartment[]>( '/departments' )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }

  static findOne = async ( id : string ) : Promise<IDepartment | IServiceError> => {
    try {
      const { data } = await hotelApi.get<IDepartment>( '/departments/' + id )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }

  static create = async ( category : ICreateDepartment ) : Promise<IDepartment | IServiceError> => {
    try {
      const { data } = await hotelApi.post<IDepartment>( '/departments', category )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }

  static update = async ( id: string, category : ICreateDepartment ) : Promise<IDepartment | IServiceError> => {
    try {
      const { data } = await hotelApi.patch<IDepartment>( '/departments/' + id, category )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }
  static toggleStatus = async ( id: string ) : Promise<IDepartment | IServiceError> => {
    try {
      const { data } = await hotelApi.delete<IDepartment>( '/departments/' + id )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }
}
