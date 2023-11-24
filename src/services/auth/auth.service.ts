import { AxiosError } from 'axios'
import { hotelApi } from '../../api'
import { IAuthUser } from '../../interfaces'

export interface ISigninResponse {
  token: string
  user: IAuthUser
}

export class AuthService {
  static signin = async ( userTerm : string, password : string ) : Promise<ISigninResponse> => {
    try {
      const { data } = await hotelApi.post<ISigninResponse>( '/auth/signin', { userTerm, password } )
      return data
    } catch ( error ) {
      if ( error instanceof AxiosError ) {
        console.log( error.response?.data )
        throw new Error( error.response?.data )
      }
      console.log( error )
      throw new Error( 'Ups, Algo salio mal' )
    }
  }

  static checkAuthStatus = async () : Promise<ISigninResponse> => {
    try {
      const { data } = await hotelApi.get<ISigninResponse>( '/auth/revalidate-token' )
      return data
    } catch ( error ) {
      if ( error instanceof AxiosError ) {
        console.log( error.response?.data )
        throw new Error( error.response?.data )
      }
      console.log( error )
      throw new Error( 'Ups, Algo salio mal' )
    }
  }
}
