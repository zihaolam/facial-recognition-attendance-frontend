import { UserApi } from './user';
import { AttendanceApi } from './attendance';
import axios from 'axios'
import { queryKeys } from './queryKeys';
import { EventApi } from './event';

// define the api
export const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
})

apiInstance.interceptors.response.use(response => response.data?.body?.data || response.data?.body || response.data)

export const api = {
    user: new UserApi(apiInstance),
    attendance: new AttendanceApi(apiInstance),
    event: new EventApi(apiInstance)
}

export { queryKeys};