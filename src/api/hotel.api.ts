import axios from "axios";
import { useAuthStore } from "../stores";


const hotelApi = axios.create({
  // Put env variables here
  baseURL: 'http://localhost:3002/api'
})

hotelApi.interceptors.request.use(
  ( config ) => {
    const token = useAuthStore.getState().token

    if ( token ) {
      config.headers[ 'Authorization' ] = `Bearer ${ token }`
    }
    return config
  }
)

export { hotelApi }
