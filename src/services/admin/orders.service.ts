import { hotelApi } from '../../api'
import { IOrder, IServiceError } from '../../interfaces'
import { handlerServicesErrors } from '../../utils'
// "customerId": "8ab7062c-054c-47e0-b5d5-671c1174238a",
//   "method": "delivery",
//   "totalProducts": 2,
//   "totalAmount": 100,
//   "paymentStatus": "pending"



export interface ICreateOrder {
  customerId: string
  method: string
  totalProducts: number
  totalAmount: number
  paymentStatus: string
}

export class OrdersService {
  static findAll = async () : Promise<IOrder[] | IServiceError> => {
    try {
      const { data } = await hotelApi.get<IOrder[]>( '/orders' )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }

  static findOne = async ( id : string ) : Promise<IOrder | IServiceError> => {
    try {
      const { data } = await hotelApi.get<IOrder>( '/orders/' + id )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }

  static create = async ( category : ICreateOrder ) : Promise<IOrder | IServiceError> => {
    try {
      const { data } = await hotelApi.post<IOrder>( '/orders', category )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }

  static update = async ( id: string, category : ICreateOrder ) : Promise<IOrder | IServiceError> => {
    try {
      const { data } = await hotelApi.patch<IOrder>( '/orders/' + id, category )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }
  static toggleStatus = async ( id: string ) : Promise<IOrder | IServiceError> => {
    try {
      const { data } = await hotelApi.delete<IOrder>( '/orders/' + id )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }
}
