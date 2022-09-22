import {APIResponse, request} from "@playwright/test";
import AddPostRequest from "../types/AddPostRequest";
import AuthenticationService from "../services/AuthenticationService";
import {API_BASE_URL, DEFAULT_PASSWORD, DEFAULT_USERNAME} from "../config";

export default class PostClient {
    private httpClient;

    //TODO replace hardcoded credentials with .env config values
    async init(username = DEFAULT_USERNAME, password = DEFAULT_PASSWORD) {
        let authService = await new AuthenticationService().init();
        let token = await authService.getTokenForUser(username, password);

        //TODO Move repetitive logic
        this.httpClient =  await request.newContext({
            baseURL: API_BASE_URL,
            extraHTTPHeaders: {
                'Authorization' : `token ${token}`
            }
        });
    }

    async addPost(request: AddPostRequest): Promise<APIResponse> {
        return this.httpClient.post('posts/', request)
    }
}