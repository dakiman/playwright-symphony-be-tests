import {test, expect} from '@playwright/test';
import PostClient from "../http/PostClient";

let postClient: PostClient;

test.beforeAll(async () => {
    postClient = await new PostClient().init();
})

test('Add post', async() => {
    let response = await postClient.addPost({
        text: 'My post body'
    });

    expect(response.ok()).toBeTruthy();
})