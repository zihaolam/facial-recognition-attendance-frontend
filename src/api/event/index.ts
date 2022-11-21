import { EventSchema, CreateEventFormValues } from './schemas';
import { buildQueryParams } from 'api/helpers';
import { AxiosInstance } from "axios";
import { apiUrls } from "../urls";

export class EventApi {
    api: AxiosInstance;
    constructor(api: AxiosInstance) {
        this.api = api;
    }

    getOne = (eventId?: string): Promise<EventSchema> => {
        return this.api.get(apiUrls.EVENT+'/'+eventId)
    }

    getAll = (step?: string, limit?: number): Promise<EventSchema[]> => {
        return this.api.get(apiUrls.EVENT+buildQueryParams({ ...(step && {step}), ...(limit && {limit}) }))
    }

    create = (formData: CreateEventFormValues): Promise<EventSchema> => {
        return this.api.post(apiUrls.EVENT, formData)
    }
}