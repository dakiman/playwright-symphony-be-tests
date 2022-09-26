import {test, expect} from '@playwright/test';
import PostClient from "../http/PostClient";

let postClient: PostClient;

test.beforeAll(async () => {
    postClient = await new PostClient().init();
})

test('Add post and read it back', async () => {
    let response = await postClient.addPost({text: 'My post body'});
    expect(response.ok()).toBeTruthy();

    let post = await response.json();
    expect(post.text).toBe('My post body');
})

/*Following few tests fail due to no validation on the API, its just used as an example*/
/*
test('Add post without text', async () => {
    let response = await postClient.addPost({text: ''});
    expect(response.status()).toBe(400);
})

test('Add post with text too long', async () => {
    let response = await postClient.addPost({text: 'a'.repeat(1000)});
    expect(response.status()).toBe(400);
})

test('Add post with text too short', async () => {
    let response = await postClient.addPost({text: 'a'});
    expect(response.status()).toBe(400);
})
*/
