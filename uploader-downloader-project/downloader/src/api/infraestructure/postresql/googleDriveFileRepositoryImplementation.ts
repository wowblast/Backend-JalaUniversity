import "reflect-metadata";
import { Repository } from "typeorm";
import { GoogleDriveFile } from "../../services/entities/googleDriveFile";
import { GoogleDriveRepository } from "../../services/interfaces/googleDriveFileRepository";
import { AppDataSource } from "./datasource";
import { GoogleDriveFileEntity } from "./entities/googleDriveFileEntity";
import { GoogleDriveFileMapper } from "../mappers/googleDriveFileMapper";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";
export class GoogleDriveRepositoryImplementation
  implements GoogleDriveRepository
{
  private repository: Repository<GoogleDriveFileEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(GoogleDriveFileEntity);
  }
  async insertFile(googleDriveFile: GoogleDriveFile): Promise<void> {
    const googleDriveFileEntity =
      GoogleDriveFileMapper.toMongoEntity(googleDriveFile);
    await this.repository.save(googleDriveFileEntity);
  }
  async deleteFile(fileName: string): Promise<void> {
    await this.repository.delete({ fileName });
  }
  async getFile(fileName: string): Promise<GoogleDriveFile[]> {
    const googleDriveFileEntities: GoogleDriveFileEntity[] =
      await this.repository.findBy({ fileName });
    return googleDriveFileEntities.map((file) =>
      GoogleDriveFileMapper.toDomainEntity(file)
    );
  }
  async updateFile(fileName: string, newFileName: string): Promise<void> {
    await this.repository.update({ fileName }, { fileName: newFileName });
  }

  async getFiles() {
    return await this.repository.find()
  }

  async getFileByEmailAndFileName(email: string, fileName: string) {
    const googleDriveFile: GoogleDriveFileEntity =
      await this.repository.findOneBy({ fileName, email });
    return GoogleDriveFileMapper.toDomainEntity(googleDriveFile)
  }
}
