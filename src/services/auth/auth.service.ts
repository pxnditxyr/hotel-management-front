import { hotelApi } from '../../api'
import { IAuthUser, IServiceError } from '../../interfaces'
import { handlerServicesErrors } from '../../utils'

export interface ISigninResponse {
  token: string
  user: IAuthUser
}

interface ISignupParams {
  name: string
  email: string
  username: string
  password: string
  dni: string
  lastname: string
  phone: string
}

export class AuthService {
  static signin = async ( userTerm : string, password : string ) : Promise<ISigninResponse | IServiceError> => {
    try {
      const { data } = await hotelApi.post<ISigninResponse>( '/auth/signin', { userTerm, password } )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }

  static checkAuthStatus = async () : Promise<ISigninResponse | IServiceError> => {
    try {
      const { data } = await hotelApi.get<ISigninResponse>( '/auth/revalidate-token' )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }

  static signup = async ( { name, email, username, password, dni, lastname, phone } : ISignupParams ) : Promise<ISigninResponse | IServiceError> => {
    try {
      const { data } = await hotelApi.post<ISigninResponse>( '/auth/signup', { name, username, email, password, dni, lastname, phone } )
      return data
    } catch ( error ) {
      return { error: handlerServicesErrors( error ) }
    }
  }
}
