import { FileDataRepositoryImplementation } from "../../infraestructure/postresql/fileDataRepositoryImplementation";
import { FileData } from "../entities/fileData";
export class FileDataService {
  private fileDataRepository: FileDataRepositoryImplementation;

  constructor() {
    this.fileDataRepository = new FileDataRepositoryImplementation();
  }

  async insertFileIfNewFile(fileData: FileData) {
    const fileDataFound = await this.fileDataRepository.getFileData(
      fileData.fileName
    );
    if (!fileDataFound) await this.fileDataRepository.insertFileData(fileData);
  }

  async deleteFileData(fileName: string) {
    await this.fileDataRepository.deleteFileData(fileName);
  }

  async getFileData(fileName: string) {
    return await this.fileDataRepository.getFileData(fileName);
  }

  async updateFileData(fileData: FileData) {
    await this.fileDataRepository.updateFileData(fileData);
  }
}
