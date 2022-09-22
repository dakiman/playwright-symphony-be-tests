import {APIResponse, request} from "@playwright/test";
import AddPostRequest from "../types/AddPostRequest";
import AuthenticationService from "../services/AuthenticationService";

export default class PostClient {
    private httpClient;

    //TODO replace hardcoded credentials with .env config values
    async init(username = 'dakiman', password = 'password123') {
        let authService = new AuthenticationService();
        await authService.init();
        let token = await authService.getTokenForUser(username, password);

        //TODO Move repetitive logic
        this.httpClient =  await request.newContext({
            baseURL: 'https://randomlyapi.symphony.is/api/',
            extraHTTPHeaders: {
                'Authorization' : `token ${token}`
            }
        });
    }

    async addPost(request: AddPostRequest): Promise<APIResponse> {
        return this.httpClient.post('posts/', request)
    }
}