import { google } from "googleapis";
import path from "path";
import { Account } from "../../services/entities/account";
import { AccountRepositoryImplementation } from "../mongodb/accountRepositoryImplementation";
import { FileData } from "../mongodb/entities/fileData";
import fs from "fs";
import { GoogleDriveFileRepositoryImplementation } from "../mongodb/googleDriveFileRepositoryImplementation";
import { GoogleDriveFile } from "../../services/entities/googleDriveFile";
import { GridFsManager } from "../mongodb/gridFsManager";
import { statusTypes } from "../../types/statusTypes";
import { RabbitMqController } from "../rabbitmq/rabbitMQcontroller";
export class GoogleDriveManager {
  private static _instance: GoogleDriveManager = new GoogleDriveManager();
  private accountRepository: AccountRepositoryImplementation;
  private accounts: Account[];
  private drive;
  private files: Array<FileData> = new Array();
  private isUploaderReady: boolean = true;
  constructor() {
    if (GoogleDriveManager._instance) {
      throw new Error("Error: Instantiation failed");
    }
    this.initializeGoogleDriveManager();
    GoogleDriveManager._instance = this;
  }

  async initializeGoogleDriveManager() {
    this.accountRepository = new AccountRepositoryImplementation();
    this.accounts = await this.accountRepository.getAllAccounts();
  }

  public async uploadFileToGoogleDrive(fileData: FileData) {
    this.files.push(fileData);
    if (this.isUploaderReady) {
      this.isUploaderReady = false;
      while (true) {
        let currentFiles: Array<FileData> = this.files;
        console.log("files remaining ", this.files);
        for (let index = 0; index < this.accounts.length; index++) {
          await this.createFile(this.accounts[index], currentFiles[0]);
          console.log("done on " + this.accounts[index].email);
        }
        console.log("done file  ", currentFiles[0].filename);
        fs.unlinkSync(
          "./src/api/Infrastructure/mongodb/outtest/" + currentFiles[0].filename
        );
        this.files.shift();
        if (this.files.length == 0) {
          break;
        }
      }
      this.isUploaderReady = true;
      console.log("ready to upload");
    }
  }

  async createFile(account: Account, fileData: FileData) {
    const authGoogle = new google.auth.OAuth2(
      account.clientId,
      account.clientSecret,
      account.redirectUri
    );
    authGoogle.setCredentials({ refresh_token: account.refrestToken });
    this.drive = google.drive({
      version: "v3",
      auth: authGoogle,
    });
    const filePath = path.join(
      "./src/api/Infrastructure/mongodb/outtest/",
      fileData.filename
    );
    const response = await this.drive.files.create({
      requestBody: {
        name: fileData.filename,
        mimeType: fileData.contentType,
      },
      media: {
        mimeType: fileData.contentType,
        body: fs.createReadStream(filePath),
      },
    });
    await this.generateDownLoadLinks(response.data.id, fileData, account.email);
  }

  async generateDownLoadLinks(id: string, fileData: FileData, email: string) {
    await this.drive.permissions.create({
      fileId: id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const result = await this.drive.files.get({
      fileId: id,
      fields: "webViewLink, webContentLink",
    });
    console.log("result links ", result.data);
    const googleDriveFile = new GoogleDriveFile();
    googleDriveFile.directDownloadLink = result.data.webContentLink;
    googleDriveFile.webViewLink = result.data.webViewLink;
    googleDriveFile.email = email;
    googleDriveFile.fileName = fileData.filename;
    googleDriveFile.fileId = id;
    await this.saveGoogleDriveFileOnDataBase(googleDriveFile);
    await this.sendFilesToDownloader(googleDriveFile);
  }

  async saveGoogleDriveFileOnDataBase(googleDriveFile: GoogleDriveFile) {
    const googleDriveFileRepositoryImplementation: GoogleDriveFileRepositoryImplementation =
      new GoogleDriveFileRepositoryImplementation();
    await googleDriveFileRepositoryImplementation.insertFile(googleDriveFile);
  }

  async sendFilesToDownloader(googleDriveFile: GoogleDriveFile) {
    const message = {
      method: "create",
      file: googleDriveFile,
    };
    await RabbitMqController.getInstance().sendMessage(JSON.stringify(message));
  }

  async deleteGoogleDriveFilesOnAllAccounts(
    googleDriveFiles: GoogleDriveFile[]
  ) {
    const accountManager = new AccountRepositoryImplementation();

    for (let index = 0; index < googleDriveFiles.length; index++) {
      const account = await accountManager.getAccount(
        googleDriveFiles[index].email
      );
      await this.deleteFileOnGoogleDrive(
        account,
        googleDriveFiles[index].fileId
      );
      console.log("delete done on " + this.accounts[index].email);
    }
  }

  async deleteFileOnGoogleDrive(account: Account, id: string) {
    const authGoogle = new google.auth.OAuth2(
      account.clientId,
      account.clientSecret,
      account.redirectUri
    );
    authGoogle.setCredentials({ refresh_token: account.refrestToken });
    this.drive = google.drive({
      version: "v3",
      auth: authGoogle,
    });
    await this.drive.files.delete({ fileId: id });
  }

  public static getInstance(): GoogleDriveManager {
    return GoogleDriveManager._instance;
  }
}
