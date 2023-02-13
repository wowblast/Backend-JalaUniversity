import { GridFsManager } from "../../Infrastructure/mongodb/gridFsManager";
import { RabbitMqController } from "../../Infrastructure/rabbitmq/rabbitMQcontroller";
import { statusTypes } from "../../types/statusTypes";
import { File } from "../entities/file";
import { GoogleDriveFileRepositoryImplementation } from '../../Infrastructure/mongodb/googleDriveFileRepositoryImplementation';
import { GoogleDriveFile } from '../entities/googleDriveFile';
import { GoogleDriveManager } from '../../Infrastructure/googledrive/googledriveManager';

export class FileService {
  async uploadFile(filename: string) {
    const gridFsManager = GridFsManager.getInstance();
    console.log("filename ", filename);
    await gridFsManager.updateFileStatus(filename, statusTypes.pending);

    const fileFound = await gridFsManager.getFile(filename);
    this.uploadFilesFromLocal(fileFound.filename)
  }
  async uploadFilesFromLocal(filename: string) {
    const gridFsManager = GridFsManager.getInstance();
    console.log("START UPLOADING...")
    await gridFsManager.uploadFileFromGridFsToDrive(filename); 
    console.log("ENDING UPLOADING... UPDATING STATUS")  
    await gridFsManager.updateFileStatus(filename, statusTypes.ready);
  }

  async getFile(filename: string): Promise<[File, GoogleDriveFile[]]> {
    const gridFsManager = GridFsManager.getInstance();
    const googleDriveFileRepositoryImplementation: GoogleDriveFileRepositoryImplementation = new GoogleDriveFileRepositoryImplementation()
    const files = await googleDriveFileRepositoryImplementation.getFile(filename)
    const fileFound = await gridFsManager.getFile(filename);
    return [fileFound, files]
  }

  async sendMessage() {
    await RabbitMqController.getInstance().sendMessage("hola 1");
    await RabbitMqController.getInstance().sendMessage("hola 2");
  }

  async uploadLocalFileToDrive(filename: string): Promise<File> {
    const gridFsManager = GridFsManager.getInstance();
    return await gridFsManager.getFile(filename)
  }

  async deleteFile(fileName: string) {
    const googleDriveManager = GoogleDriveManager.getInstance()
    const gridFsManager = GridFsManager.getInstance();
    const googleDriveFileRepositoryImplementation: GoogleDriveFileRepositoryImplementation = new GoogleDriveFileRepositoryImplementation()
    const googleDriveFiles = await googleDriveFileRepositoryImplementation.getFile(fileName)
    await googleDriveManager.deleteGoogleDriveFilesOnAllAccounts(googleDriveFiles);
    await googleDriveFileRepositoryImplementation.deleteFile(fileName)
    await gridFsManager.deleteFile(fileName)

    //delete drive
    //delete mongo normal
    //delete chunks
    //mandar mensaje
  }

  async updateFile(fileName: string) {
    //update drive
    //update mongo normal
    //update chunks
    //update mensaje

  }
}
