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

test('Add comment to post and read it back', async () => {
    let post = await postService.createNewPost(defaultAddPostRequest)
    let commentResponse = await commentClient.addComment({text: 'My comment', post: post.id});
    expect(commentResponse.ok()).toBeTruthy();

    let postCommentsResponse = await commentClient.getCommentsForPost(post.id);
    expect(postCommentsResponse.ok()).toBeTruthy();

    let postCommentsResponseBody = await postCommentsResponse.json();
    expect(postCommentsResponseBody.results.length).toBe(1);
    expect(postCommentsResponseBody.results[0].text).toBe('My comment');
})

test('Add comment without text', async () => {
    let post = await postService.createNewPost(defaultAddPostRequest)
    let commentResponse = await commentClient.addComment({text: '', post: post.id});
    expect(commentResponse.status()).toBe(400);
})

test('Add comment without post', async () => {
    let commentResponse = await commentClient.addComment({text: 'My comment', post: null});
    expect(commentResponse.status()).toBe(400);
})

test('Add comment to non-existant post', async () => {
    let commentResponse = await commentClient.addComment({text: 'My comment', post: 999999});
    expect(commentResponse.status()).toBe(400);
})