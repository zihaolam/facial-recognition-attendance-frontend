import { UserApi } from './user';
import { AttendanceApi } from './attendance';
import axios from 'axios'
import { queryKeys } from './queryKeys';
import { EventApi } from './event';


const baseURL = import.meta.env.DEV ? import.meta.env.VITE_API_DEV_ENDPOINT : import.meta.env.VITE_API_PROD_ENDPOINT

export const apiInstance = axios.create({
  baseURL,
})

apiInstance.interceptors.response.use(response => response.data?.body?.data || response.data?.body || response.data)

export const api = {
    user: new UserApi(apiInstance),
    attendance: new AttendanceApi(apiInstance),
    event: new EventApi(apiInstance)
}

export { queryKeys};