const {
    google
} = require('googleapis');
const SCOPES = [
    "https://www.googleapis.com/auth/calendar"
];

class Auth {
    constructor(client_id, client_secret, redirect_url) {
        this.oAuth2Client = new google.auth.OAuth2(
            client_id,
            client_secret,
            redirect_url
        );
        return this;
    }

    generateAuthUrl(state) {
        return this.oAuth2Client.generateAuthUrl({
            scope: SCOPES,
            state: state
        });
    }

}


module.exports = Auth;
