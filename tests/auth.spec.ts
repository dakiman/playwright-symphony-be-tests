import {test, expect} from '@playwright/test';
import AuthenticationClient from "../http/AuthenticationClient";
import {generateRandomIdentifier} from "../utils/DataUtils";
import {readFileAsJson} from "../utils/FileUtils";
import SignupRequest from "../types/SignupRequest";

let authClient: AuthenticationClient;

test.beforeAll(async () => {
    authClient = await new AuthenticationClient().init();
})

test('Signup', async () => {
    let randomIdentifier = generateRandomIdentifier();
    let request: SignupRequest = readFileAsJson('./data/defaultSignupRequest.json')
    request.username = request.username + randomIdentifier;
    request.email = `test+${randomIdentifier}@mail.com`
    let response = await authClient.signup(request);

    expect(response.ok()).toBeTruthy();
})


test('Login', async () => {
    let request = {
        username: 'dakiman',
        password: 'password123'
    }

    let response = await authClient.login(request);

    expect(response.ok()).toBeTruthy();
})