import { GridFsManager } from "../../Infrastructure/mongodb/gridFsManager";
import { statusTypes } from "../../types/statusTypes";
import { File } from "../entities/file";
import { GoogleDriveFileRepositoryImplementation } from "../../Infrastructure/mongodb/googleDriveFileRepositoryImplementation";
import { GoogleDriveFile } from "../entities/googleDriveFile";
import { GoogleDriveManager } from "../../Infrastructure/googledrive/googledriveManager";
import { RabbitMqController } from "../../Infrastructure/rabbitmq/rabbitMQcontroller";
import { GoogleDriveAction } from "../../Infrastructure/googledrive/googleDriveAction";
import { config } from "../../../../config";
import logger from "jet-logger";

export class FileService {
  async uploadFile(filename: string) {
    const gridFsManager = GridFsManager.getInstance();
    await gridFsManager.updateFileStatus(filename, statusTypes.pending);
    const fileFound = await gridFsManager.getFile(filename);
    this.uploadFilesFromLocal(fileFound);
  }
  async uploadFilesFromLocal(fileData: File) {
    const gridFsManager = GridFsManager.getInstance();
    const googleDriveManager = GoogleDriveManager.getInstance();
    logger.info("START UPLOADING...");
    const googleDriveAction: GoogleDriveAction = {
      method: config.googleDriveActionTypes.createFile,
      file: fileData,
    };
    await googleDriveManager.manageGoogleDriveService(googleDriveAction);
    
  }
  async getAllFiles() {
    const gridFsManager = GridFsManager.getInstance();
    const files = await gridFsManager.getAllFiles();
    return files;
  }

  async getFile(filename: string): Promise<[File, GoogleDriveFile[]]> {
    const gridFsManager = GridFsManager.getInstance();
    const googleDriveFileRepositoryImplementation: GoogleDriveFileRepositoryImplementation =
      new GoogleDriveFileRepositoryImplementation();
    const files = await googleDriveFileRepositoryImplementation.getFile(
      filename
    );
    const fileFound = await gridFsManager.getFile(filename);
    return [fileFound, files];
  }

  async uploadLocalFileToDrive(filename: string): Promise<File> {
    const gridFsManager = GridFsManager.getInstance();
    return await gridFsManager.getFile(filename);
  }

  async deleteFile(fileName: string) {
    const gridFsManager = GridFsManager.getInstance();
    const googleDriveManager = GoogleDriveManager.getInstance();

    const fileFound = await gridFsManager.getFile(fileName);
    const googleDriveAction: GoogleDriveAction = {
      method: config.googleDriveActionTypes.deleteFile,
      file: fileFound,
    };
    googleDriveManager.manageGoogleDriveService(googleDriveAction);
  }

  async deleteFileFromServices(fileName: string) {
    const googleDriveManager = GoogleDriveManager.getInstance();
    const gridFsManager = GridFsManager.getInstance();
    const googleDriveFileRepositoryImplementation: GoogleDriveFileRepositoryImplementation =
      new GoogleDriveFileRepositoryImplementation();
    const googleDriveFiles =
      await googleDriveFileRepositoryImplementation.getFile(fileName);
    await googleDriveManager.deleteGoogleDriveFilesOnAllAccounts(
      googleDriveFiles
    );
    await googleDriveFileRepositoryImplementation.deleteFile(fileName);
    await gridFsManager.deleteFile(fileName);
    await this.sendFilesToDownloader(
      config.rabbiMqMessages.deleteFile,
      googleDriveFiles[0]
    );
  }

  async sendFilesToDownloader(
    method: string,
    googleDriveFile: GoogleDriveFile
  ) {
    if (googleDriveFile) {
      const message = {
        method: method,
        file: googleDriveFile,
      };
      await RabbitMqController.getInstance().sendMessage(
        JSON.stringify(message)
      );
    }
  }

  async updateFileFromServices(googleDriveAction: GoogleDriveAction) {
    const googleDriveManager = GoogleDriveManager.getInstance();
    googleDriveManager.manageGoogleDriveService(googleDriveAction);
  }

  async updateFile(fileName: string, newFileName: string) {
    const gridFsManager = GridFsManager.getInstance();
    const fileFound = await gridFsManager.getFile(fileName);
    if (fileFound) {
      const googleDriveAction: GoogleDriveAction = {
        method: config.googleDriveActionTypes.updateFile,
        file: fileFound,
        newFileName: newFileName,
      };
      this.updateFileFromServices(googleDriveAction);
    }
  }
}
