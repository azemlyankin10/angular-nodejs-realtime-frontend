import { IUserProfile } from './profile';

export interface IAuthResp {
    token?: string;
    user?: IUserProfile;
    error?: string;
}
