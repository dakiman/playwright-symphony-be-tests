import {APIResponse, request} from "@playwright/test";
import AddPostRequest from "../types/AddPostRequest";
import AuthenticationService from "../services/AuthenticationService";
import AddCommentRequest from "../types/AddCommentRequest";

export default class CommentClient {
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

    async addComment(request: AddCommentRequest): Promise<APIResponse> {
        return this.httpClient.post('post-comments/', { data: request })
    }

    async getCommentsForPost(postId: number): Promise<APIResponse> {
        return this.httpClient.get(`posts/${postId}/comments`);
    }
}