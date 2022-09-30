import {readFileAsJson} from "../../utils/FileUtils";
import SignupRequest from "../../types/SignupRequest";
import {generateRandomIdentifier} from "../../utils/DataUtils";

export default class SignupRequestProvider {
    public static getSignupRequest(): SignupRequest {
        let defaultRequest = readFileAsJson('./data/static/defaultSignupRequest.json');
        let randomIdentifier = generateRandomIdentifier();
        let email = 'user' + randomIdentifier + '@example.com';
        let username = 'user' + randomIdentifier;

        return {...defaultRequest, email, username};
    }
}