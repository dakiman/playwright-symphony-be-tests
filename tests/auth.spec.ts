import {test, expect} from '@playwright/test';
import AuthenticationClient from "../http/AuthenticationClient";
import {generateRandomIdentifier, getDateWithOffsetYears} from "../utils/DataUtils";
import {readFileAsJson} from "../utils/FileUtils";
import SignupRequest from "../types/SignupRequest";

let authClient: AuthenticationClient;
let defaultSignupRequest: SignupRequest = readFileAsJson('./data/defaultSignupRequest.json');
let validEmails: Array<string> = readFileAsJson('./data/validEmails.json');
let invalidEmails: Array<string> = readFileAsJson('./data/invalidEmails.json');

test.beforeEach(async () => {
    authClient = await new AuthenticationClient().init();
})

validEmails.forEach(email => {
    test(`Signup new user with valid email ${email}`, async () => {
        let randomIdentifier = generateRandomIdentifier();
        email = email.replace('%s', '+' + randomIdentifier);
        let username = 'user' + randomIdentifier;
        let response = await authClient.signup({...defaultSignupRequest, email, username});
        let responseBody = await response.json();

        expect(response.ok()).toBeTruthy();
        expect(responseBody.success).toBe('Thanks for signing up.');
    })
})

invalidEmails.forEach(email => {
    test(`Signup new user with invalid email ${email}`, async () => {
        let randomIdentifier = generateRandomIdentifier();
        let username = 'user' + randomIdentifier;
        let response = await authClient.signup({...defaultSignupRequest, email, username});
        let responseBody = await response.json();

        expect(response.status()).toBe(400);
        expect(responseBody.email).toContain('Enter a valid email address.');
    })
})

test('Signup new user with invalid date of birth format', async () => {
    let randomIdentifier = generateRandomIdentifier();
    let email = 'user' + randomIdentifier + '@example.com';
    let username = 'user' + randomIdentifier;
    let response = await authClient.signup({...defaultSignupRequest, email, username, dateOfBirth: '1997/01/01'});
    let responseBody = await response.json();

    expect(response.status()).toBe(400);
    expect(responseBody.dateOfBirth).toContain('Date has wrong format. Use one of these formats instead: DD/MM/YYYY.');
})

test('Sigup new user that isnt atleast 18 years old', async () => {
    let randomIdentifier = generateRandomIdentifier();
    let email = 'user' + randomIdentifier + '@example.com';
    let username = 'user' + randomIdentifier;
    let dateOfBirth = getDateWithOffsetYears(17);
    let response = await authClient.signup({...defaultSignupRequest, email, username, dateOfBirth});
    let responseBody = await response.json();

    expect(response.status()).toBe(400);
    expect(responseBody.dateOfBirth).toContain('You need to be at least 18 old to signup.');
})

test('Login', async () => {
    let request = {
        username: 'dakiman',
        password: 'password123'
    }

    let response = await authClient.login(request);

    expect(response.ok()).toBeTruthy();
})