import {test, expect} from '@playwright/test';
import PostClient from "../http/PostClient";
import CommentClient from "../http/CommentClient";
import PostService from "../services/PostService";
import AddPostRequest from "../types/AddPostRequest";
import {readFileAsJson} from "../utils/FileUtils";

let postClient: PostClient;
let commentClient: CommentClient;
let postService: PostService;
let defaultAddPostRequest: AddPostRequest

test.beforeAll(async () => {
    postClient = await new PostClient().init();
    commentClient = await new CommentClient().init();
    postService = await new PostService().init();
    defaultAddPostRequest = readFileAsJson('./data/defaultAddPostRequest.json')
})

test('Add comment', async () => {
    let post = await postService.createNewPost(defaultAddPostRequest)
    let commentResponse = await commentClient.addComment({text: 'My comment', post: post.id});

    expect(commentResponse.ok()).toBeTruthy();
})

test('Read comments on post', async () => {
    let post = await postService.createNewPost(defaultAddPostRequest)
    let commentResponse = await commentClient.addComment({text: 'My comment', post: post.id});
    expect(commentResponse.ok()).toBeTruthy();

    let postCommentsResponse = await commentClient.getCommentsForPost(post.id);
    expect(postCommentsResponse.ok()).toBeTruthy();
})