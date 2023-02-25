import { GridFsManager } from "../../Infrastructure/mongodb/gridFsManager";
import { statusTypes } from "../../types/statusTypes";
import { File } from "../entities/file";
import { GoogleDriveFileRepositoryImplementation } from "../../Infrastructure/mongodb/googleDriveFileRepositoryImplementation";
import { GoogleDriveFile } from "../entities/googleDriveFile";
import { GoogleDriveManager } from "../../Infrastructure/googledrive/googledriveManager";
import { RabbitMqController } from "../../Infrastructure/rabbitmq/rabbitMQcontroller";

export class FileService {
  async uploadFile(filename: string) {
    const gridFsManager = GridFsManager.getInstance();
    await gridFsManager.updateFileStatus(filename, statusTypes.pending);
    const fileFound = await gridFsManager.getFile(filename);
    this.uploadFilesFromLocal(fileFound.filename);
  }
  async uploadFilesFromLocal(filename: string) {
    const gridFsManager = GridFsManager.getInstance();
    console.log("START UPLOADING...");
    await gridFsManager.uploadFileFromGridFsToDrive(filename);
    console.log("ENDING UPLOADING... UPDATING STATUS");
    await gridFsManager.updateFileStatus(filename, statusTypes.ready);
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

  async updateFile(fileName: string) {
    //update drive
    //update mongo normal
    //update chunks
    //update mensaje
  }
}
