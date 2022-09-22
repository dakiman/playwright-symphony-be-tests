import {APIResponse, request} from '@playwright/test';
import SignupRequest from "../types/SignupRequest";
import LoginRequest from "../types/LoginRequest";

export default class AuthenticationClient {
    private httpClient;

    async init() {
        //TODO replace baseUrl hardocded with .env config values
        this.httpClient = await request.newContext({
            baseURL: 'https://randomlyapi.symphony.is/api/',
        })
    }

    async signup(request: SignupRequest): Promise<APIResponse> {
        return this.httpClient.post('auth/signup/', {
            data: request
        });
    }

    async login(request: LoginRequest): Promise<APIResponse> {
        return this.httpClient.post('auth/login/', { data: request })
    }
}