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
import { GoogleDriveAction } from "./googleDriveAction";
import { config } from "../../../../config";
import { File } from "../../services/entities/file";
import { FileService } from "../../services/coreServices/fileService";
import { AccountService } from '../../services/coreServices/accountService';
export class GoogleDriveManager {
  private static _instance: GoogleDriveManager = new GoogleDriveManager();
  private accountRepository: AccountRepositoryImplementation;
  private accounts: Account[];
  private drive;
  private gridFsManager: GridFsManager;
  private files: Array<FileData> = new Array();
  private googleDriveActions: Array<GoogleDriveAction> = new Array();
  private isGoogleDriveManagerReady = true;

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
    this.gridFsManager = GridFsManager.getInstance();
  }

  public async uploadFileToGoogleDrive(fileData: File) {
    await this.gridFsManager.downloadFileFromGridFsToTempFolder(
      fileData.filename
    );
    this.accounts = await this.accountRepository.getAllAccounts();
    //  let currentFiles: Array<FileData> = this.files;
    for (let index = 0; index < this.accounts.length; index++) {
      await this.createFile(this.accounts[index], fileData);
      console.log("done on " + this.accounts[index].email);
    }
    console.log("done file  ", fileData.filename);
    fs.unlinkSync(
      "./src/api/Infrastructure/mongodb/outtest/" + fileData.filename
    );
  }
  setAccountCredentials(account: Account) {
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
  }

  async createFile(account: Account, fileData: File) {
    this.setAccountCredentials(account);

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

  async generateDownLoadLinks(id: string, fileData: File, email: string) {
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
    const googleDriveFile = new GoogleDriveFile();
    googleDriveFile.directDownloadLink = result.data.webContentLink;
    googleDriveFile.webViewLink = result.data.webViewLink;
    googleDriveFile.email = email;
    googleDriveFile.fileName = fileData.filename;
    googleDriveFile.fileId = id;
    googleDriveFile.fileSize = parseInt(fileData.size);
    await this.saveGoogleDriveFileOnDataBase(googleDriveFile);
    await this.sendFilesToDownloader(googleDriveFile, "create");
  }

  async saveGoogleDriveFileOnDataBase(googleDriveFile: GoogleDriveFile) {
    const googleDriveFileRepositoryImplementation: GoogleDriveFileRepositoryImplementation =
      new GoogleDriveFileRepositoryImplementation();
    await googleDriveFileRepositoryImplementation.insertFile(googleDriveFile);
  }

  async deleteFilesFromAccount(email: string) {
    const accountService = new AccountService();
    const googleDriveFilesFound = await this.getGoogleDriveFilesByEmail(email);
    const emailAccount = await this.accountRepository.getAccount(email);
    if (googleDriveFilesFound && emailAccount) {
      for (let index = 0; index < googleDriveFilesFound.length; index++) {
        await this.deleteFileOnGoogleDrive(
          emailAccount,
          googleDriveFilesFound[index].fileId
        );
      }
      await accountService.deleteGoogleDriveFileByEmail(email);
      await accountService.deleteAccountData(email);
      const googleDriveFolder = new GoogleDriveFile();
      googleDriveFolder.email = email
      await this.sendFilesToDownloader(googleDriveFolder, 'delete account')
    }
  }

  async getGoogleDriveFilesByEmail(email: string): Promise<GoogleDriveFile[]> {
    const googleDriveFileRepositoryImplementation: GoogleDriveFileRepositoryImplementation =
      new GoogleDriveFileRepositoryImplementation();
    return await googleDriveFileRepositoryImplementation.getFilesByEmail(email);
  }

  async sendFilesToDownloader(
    googleDriveFile: GoogleDriveFile,
    method: string,
    newFileName?: string
  ) {
    const message = {
      method: method,
      file: googleDriveFile,
      newFileName,
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
    }
  }

  async deleteFileOnGoogleDrive(account: Account, id: string) {
    this.setAccountCredentials(account);
    await this.drive.files.delete({ fileId: id });
  }

  async manageGoogleDriveService(googleDriveAction: GoogleDriveAction) {
    this.googleDriveActions.push(googleDriveAction);
    if (this.isGoogleDriveManagerReady) {
      this.isGoogleDriveManagerReady = false;
      while (true) {
        let currentActions: Array<GoogleDriveAction> = this.googleDriveActions;
        console.log("actions remaining", this.googleDriveActions);
        switch (currentActions[0].method) {
          case config.googleDriveActionTypes.createAccount:
            break;
          case config.googleDriveActionTypes.createFile:
            await this.uploadFileToGoogleDrive(currentActions[0].file);
            break;
          case config.googleDriveActionTypes.deleteAccount:
            await this.deleteFilesFromAccount(currentActions[0].email)
            break;
          case config.googleDriveActionTypes.deleteFile:
            const fileService = new FileService();
            await fileService.deleteFileFromServices(
              currentActions[0].file.filename
            );
            break;
          case config.googleDriveActionTypes.updateFile:
            await this.updateFileName(googleDriveAction);
          default:
            break;
        }
        this.googleDriveActions.shift();
        if (this.googleDriveActions.length == 0) {
          break;
        }
      }
      this.isGoogleDriveManagerReady = true;
      console.log("ready to google drive actions");
    }
  }

  async updateFileName(googleDriveAction: GoogleDriveAction) {
    this.accounts = await this.accountRepository.getAllAccounts();
    const googleDriveFileRepositoryImplementation: GoogleDriveFileRepositoryImplementation =
      new GoogleDriveFileRepositoryImplementation();
    for (let index = 0; index < this.accounts.length; index++) {
      this.setAccountCredentials(this.accounts[index]);
      const googleDrivefile =
        await googleDriveFileRepositoryImplementation.getFileByEmailAndFileName(
          this.accounts[index].email,
          googleDriveAction.file.filename
        );
      await this.updateFileNameOnGoogleDriveAccount(
        googleDriveAction,
        googleDrivefile
      );
      await this.sendFilesToDownloader(
        googleDrivefile,
        "update file",
        googleDriveAction.newFileName
      );
      console.log("done on " + this.accounts[index].email);
    }
    await googleDriveFileRepositoryImplementation.updateFile(
      googleDriveAction.file.filename,
      googleDriveAction.newFileName
    );
    await this.gridFsManager.updateFileName(
      googleDriveAction.file.filename,
      googleDriveAction.newFileName
    );
  }

  async updateFileNameOnGoogleDriveAccount(
    googleDriveAction: GoogleDriveAction,
    googleDrivefile: GoogleDriveFile
  ) {
    console.log(
      "updating to  ",
      googleDrivefile.fileId,
      " ",
      googleDriveAction.newFileName
    );
    await this.drive.files.update({
      fileId: googleDrivefile.fileId,
      resource: { name: googleDriveAction.newFileName },
    });
  }

  public static getInstance(): GoogleDriveManager {
    return GoogleDriveManager._instance;
  }
}
