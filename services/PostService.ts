import {DEFAULT_PASSWORD, DEFAULT_USERNAME} from "../config";
import PostClient from "../http/PostClient";
import AddPostRequest from "../types/AddPostRequest";

export default class PostService {
    private postClient: PostClient;

    async init(username = DEFAULT_USERNAME, password = DEFAULT_PASSWORD) {
        this.postClient = await new PostClient().init(username, password);
        return this;
    }

    //TODO replace any with type
    async createNewPost(request: AddPostRequest): Promise<any> {
        let response = await this.postClient.addPost(request);

        if(!response.ok())
            throw new Error("Couldnt create post");

        return await response.json();
    }
}