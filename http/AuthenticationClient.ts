import {APIResponse, request} from '@playwright/test';
import SignupRequest from "../types/SignupRequest";
import LoginRequest from "../types/LoginRequest";
import {API_BASE_URL} from "../config";

export default class AuthenticationClient {
    private httpClient;

    async init() {
        this.httpClient = await request.newContext({
            baseURL: API_BASE_URL,
        })

        return this;
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