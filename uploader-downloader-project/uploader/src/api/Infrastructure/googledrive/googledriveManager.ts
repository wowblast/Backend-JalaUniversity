import { google } from "googleapis";
export class googleDriveManager {
    private CLIENT_ID= ''
    private CLIENT_SECRET = '';
    private REDIRECT_URI= 'https://developers.google.com/oauthplayground';
    private refreshTRoken= ''

    constructor() {

    }

    uploadFileToGoogleDrive(fiel) {
        const authGoogle = new google.auth.OAuth2(
            this.CLIENT_ID,
            this.CLIENT_SECRET,
            this.REDIRECT_URI

        )

        authGoogle.setCredentials({refresh_token: this.refreshTRoken})
        const drive = google.drive({
            version:'v3',
            auth:authGoogle
        })
    }
    
}