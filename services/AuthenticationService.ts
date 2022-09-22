import AuthenticationClient from "../http/AuthenticationClient";

export default class AuthenticationService {
    private authClient: AuthenticationClient;

    async init() {
        this.authClient = await new AuthenticationClient().init();
        return this;
    }

    async getTokenForUser(username, password): Promise<string> {
        let response = await this.authClient.login({ username, password });

        let body = await response.json();

        return body.token;
    }
}