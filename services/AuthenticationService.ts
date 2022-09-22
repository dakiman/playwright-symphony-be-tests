import AuthenticationClient from "../http/AuthenticationClient";

export default class AuthenticationService {
    private authClient: AuthenticationClient;

    constructor() {
    }

    async init() {
        this.authClient = new AuthenticationClient();
        await this.authClient.init();
    }

    async getTokenForUser(username, password): Promise<string> {
        let response = await this.authClient.login({ username, password });

        let body = await response.json();

        return body.token;
    }
}