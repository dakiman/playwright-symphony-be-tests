import {test, expect} from '@playwright/test';
import PostClient from "../http/PostClient";

let postClient: PostClient;

test.beforeAll(async () => {
    postClient = new PostClient();
    await postClient.init();
})

test('Add post', async() => {
    let response = await postClient.addPost({
        text: 'My post body'
    });

    console.log(response)
    expect(response.ok()).toBeTruthy();
})