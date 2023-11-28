import { hotelApi } from '../../api'
import { IDepartmentCategory, IServiceError } from '../../interfaces'
import { handlerServicesErrors } from '../../utils'

export interface ICreateDepartmentCategory {
  name: string
}

export class DepartmentCategoriesService {
  static findAll = async () : Promise<IDepartmentCategory[] | IServiceError> => {
    try {
      const { data } = await hotelApi.get<IDepartmentCategory[]>( '/department-categories' )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }

  static findOne = async ( id : string ) : Promise<IDepartmentCategory | IServiceError> => {
    try {
      const { data } = await hotelApi.get<IDepartmentCategory>( '/department-categories/' + id )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }

  static create = async ( departmentCategory : ICreateDepartmentCategory ) : Promise<IDepartmentCategory | IServiceError> => {
    try {
      const { data } = await hotelApi.post<IDepartmentCategory>( '/department-categories', departmentCategory )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }

  static update = async ( id: string, departmentCategory : ICreateDepartmentCategory ) : Promise<IDepartmentCategory | IServiceError> => {
    try {
      const { data } = await hotelApi.patch<IDepartmentCategory>( '/department-categories/' + id, departmentCategory )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }
  static toggleStatus = async ( id: string ) : Promise<IDepartmentCategory | IServiceError> => {
    try {
      const { data } = await hotelApi.delete<IDepartmentCategory>( '/department-categories/' + id )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }
}
