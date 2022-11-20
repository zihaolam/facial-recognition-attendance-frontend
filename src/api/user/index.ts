import { AxiosInstance } from 'axios';
import { CreateUserFormValues, UserSchema } from './schemas';
import { apiUrls, pathJoin } from "../urls";

export class UserApi {
    api: AxiosInstance;
    constructor(api: AxiosInstance) {
        this.api = api;
    }

    create = (formData: CreateUserFormValues): Promise<UserSchema[]> => this.api.post(apiUrls.USER, formData)

    getAll = (): Promise<UserSchema[]> => this.api.get(apiUrls.USER)
    getOne = (userId: string): Promise<UserSchema> => this.api.get(pathJoin(apiUrls.USER, userId))
}