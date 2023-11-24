import { AxiosError } from "axios"

export const handlerServicesErrors = ( error : any ) => {
  if ( error  instanceof AxiosError ) {
    if ( typeof error.response?.data === 'string' ) return error.response?.data
    if ( typeof error.response?.data.message === 'string' ) return error.response?.data.message
    const message = error.response?.data.message
    const joinedMessage = message.join( ', ' )
    return joinedMessage
  }
  return 'Ups, Algo salio mal'
}
