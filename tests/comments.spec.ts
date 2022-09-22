import {test, expect} from '@playwright/test';
import PostClient from "../http/PostClient";
import CommentClient from "../http/CommentClient";

let postClient: PostClient;
let commentClient: CommentClient;


test.beforeAll(async () => {
    postClient = new PostClient();
    await postClient.init();
    commentClient = new CommentClient();
    await commentClient.init();
})

test('Add comment', async () => {
    /*TODO move to service*/
    let response = await postClient.addPost({
        text: 'My post body'
    });
    let body = await response.json();

    expect(response.ok()).toBeTruthy();

    let commentResponse = await commentClient.addComment({text: 'My comment', post: body.id});

    expect(commentResponse.ok()).toBeTruthy();
})

test('Read comments on post', async () => {
    /*TODO move to service*/
    let response = await postClient.addPost({
        text: 'My post body'
    });
    expect(response.ok()).toBeTruthy();

    let body = await response.json();

    let commentResponse = await commentClient.addComment({text: 'My comment', post: body.id});
    expect(commentResponse.ok()).toBeTruthy();

    let postCommentsResponse = await commentClient.getCommentsForPost(body.id);
    expect(postCommentsResponse.ok()).toBeTruthy();
})