import { google } from "googleapis";
export class googleDriveManager {
    private CLIENT_ID= '282679733621-ijjt2he0fk861p8dq6p4c4glf1be1nlk.apps.googleusercontent.com'
    private CLIENT_SECRET = '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';
    private REDIRECT_URI= 'https://developers.google.com/oauthplayground';
    private refreshTRoken= '1//04jHW2bT2vFI7CgYIARAAGAQSNwF-L9IrBuBW4z4z4O066unJ5FWaL74ELpAT-j9pNJl7WHqRbmkb4SG4w7IUbHOKa1_i6V-qXRk'

    constructor() {

    }

    uploadFileToGoogleDrive() {
        const authGoogle = new google.auth.OAuth2(
            this.CLIENT_ID,
            this.CLIENT_SECRET,
            this.REDIRECT_URI

        )

        authGoogle.setCredentials({refresh_token: this.refreshTRoken})
    }
    
}