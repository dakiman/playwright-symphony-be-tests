import {APIRequestContext, APIResponse, request} from "@playwright/test";
import AddPostRequest from "../types/AddPostRequest";
import AuthenticationService from "../services/AuthenticationService";
import AddCommentRequest from "../types/AddCommentRequest";
import {API_BASE_URL, DEFAULT_PASSWORD, DEFAULT_USERNAME} from "../config";

export default class CommentClient {
    private httpClient: APIRequestContext;

    async init(username = DEFAULT_USERNAME, password = DEFAULT_PASSWORD): Promise<CommentClient> {
        let authService = await new AuthenticationService().init();
        let token = await authService.getTokenForUser(username, password);

        //TODO Move repetitive logic
        this.httpClient = await request.newContext({
            baseURL: API_BASE_URL,
            extraHTTPHeaders: {
                'Authorization': `token ${token}`
            }
        });

        return this;
    }

    async addComment(request: AddCommentRequest): Promise<APIResponse> {
        return this.httpClient.post('post-comments/', {data: request})
    }

    async getCommentsForPost(postId: number): Promise<APIResponse> {
        return this.httpClient.get(`posts/${postId}/comments`);
    }
}