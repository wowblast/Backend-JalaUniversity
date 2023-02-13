import { GridFsManager } from "../../Infrastructure/mongodb/gridFsManager";
import { RabbitMqController } from "../../Infrastructure/rabbitmq/rabbitMQcontroller";
import { statusTypes } from "../../types/statusTypes";
import { File } from "../entities/file";
import { GoogleDriveFileRepositoryImplementation } from '../../Infrastructure/mongodb/googleDriveFileRepositoryImplementation';
import { GoogleDriveFile } from '../entities/googleDriveFile';

export class FileService {
  async uploadFile(filename: string) {
    const gridFsManager = GridFsManager.getInstance();
    console.log("filename ", filename);
    await gridFsManager.updateFileStatus(filename, statusTypes.pending);
  }

  async getFile(filename: string): Promise<[File, GoogleDriveFile[]]> {
    const gridFsManager = GridFsManager.getInstance();
    const googleDriveFileRepositoryImplementation: GoogleDriveFileRepositoryImplementation = new GoogleDriveFileRepositoryImplementation()
    const files = await googleDriveFileRepositoryImplementation.getFile(filename)
    const fileFound = await gridFsManager.getFile(filename)
    //gridFsManager.downloadFile(fileFound.filename)
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
