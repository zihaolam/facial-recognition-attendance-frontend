import { AttendanceSchema } from './schemas';
import { buildQueryParams } from 'api/helpers';
import { AxiosInstance } from "axios";
import { apiUrls } from "../urls";

export class AttendanceApi {
    api: AxiosInstance;
    constructor(api: AxiosInstance) {
        this.api = api;
    }

    get = (attendanceId?: string, step?: number, limit?: string): Promise<AttendanceSchema[]> => {
        if (attendanceId) return this.api.get(apiUrls.ATTENDANCE+'/'+attendanceId)
        return this.api.get(apiUrls.ATTENDANCE+buildQueryParams({ ...(step && {step}), ...(limit && {limit}) }))
    }
}