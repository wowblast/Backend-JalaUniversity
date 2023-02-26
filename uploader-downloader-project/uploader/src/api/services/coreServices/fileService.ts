import { GridFsManager } from "../../Infrastructure/mongodb/gridFsManager";
import { statusTypes } from "../../types/statusTypes";
import { File } from "../entities/file";
import { GoogleDriveFileRepositoryImplementation } from "../../Infrastructure/mongodb/googleDriveFileRepositoryImplementation";
import { GoogleDriveFile } from "../entities/googleDriveFile";
import { GoogleDriveManager } from "../../Infrastructure/googledrive/googledriveManager";
import { RabbitMqController } from "../../Infrastructure/rabbitmq/rabbitMQcontroller";
import { GoogleDriveAction } from '../../Infrastructure/googledrive/googleDriveAction';
import { config } from "../../../../config";

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
    console.log("START UPLOADING...");
    const googleDriveAction : GoogleDriveAction = {
      method: config.googleDriveActionTypes.createFile,
      file: fileData
    }
    await googleDriveManager.manageGoogleDriveService(googleDriveAction)
    console.log("ENDING UPLOADING... UPDATING STATUS");
    await gridFsManager.updateFileStatus(fileData.filename, statusTypes.ready);
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

    const fileFound = await gridFsManager.getFile(fileName)
    const googleDriveAction: GoogleDriveAction = {
      method: config.googleDriveActionTypes.deleteFile,
      file:fileFound
    }
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
    await this.sendFilesToDownloader("delete", googleDriveFiles[0]);
  }

  async sendFilesToDownloader(
    method: string,
    googleDriveFile: GoogleDriveFile
  ) {
    if (googleDriveFile) {
      console.log("message")
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
    const gridFsManager = GridFsManager.getInstance();
    
   /* const googleDriveFiles =
      await googleDriveFileRepositoryImplementation.getFile(fileName);
      await googleDriveManager.updateAccount(
        googleDriveFiles
      );
      await googleDriveFileRepositoryImplementation.deleteFile(fileName);
      await gridFsManager.deleteFile(fileName);
      await this.sendFilesToDownloader("delete", googleDriveFiles[0]);*/
          googleDriveManager.manageGoogleDriveService(googleDriveAction);

      
      
  }

  async updateFile(fileName: string, newFileName: string) {
    const gridFsManager = GridFsManager.getInstance();
    const fileFound =
      await gridFsManager.getFile(fileName);
    console.log("filñename ", fileName, "NEWF ", newFileName)
    const googleDriveAction: GoogleDriveAction = {
      method: config.googleDriveActionTypes.updateFile,
      file:fileFound,
      newFileName: newFileName
    }
    console.log(googleDriveAction)
    this.updateFileFromServices(googleDriveAction)
    //update drive
    //update mongo normal
    //update chunks
    //update mensaje
  }
}
