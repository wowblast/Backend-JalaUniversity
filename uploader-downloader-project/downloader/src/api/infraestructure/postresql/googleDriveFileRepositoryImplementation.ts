import "reflect-metadata";
import { Repository } from "typeorm";
import { GoogleDriveFile } from "../../services/entities/googleDriveFile";
import { GoogleDriveRepository } from "../../services/interfaces/googleDriveFileRepository";
import { AppDataSource } from "./datasource";
import { GoogleDriveFileEntity } from "./entities/googleDriveFileEntity";
import { GoogleDriveFileMapper } from "../mappers/googleDriveFileMapper";
export class GoogleDriveRepositoryImplementation
  implements GoogleDriveRepository
{
  private repository: Repository<GoogleDriveFileEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(GoogleDriveFileEntity);
  }
  async insertFile(googleDriveFile: GoogleDriveFile): Promise<void> {
    await AppDataSource.initialize();
    const googleDriveFileEntity =
      GoogleDriveFileMapper.toMongoEntity(googleDriveFile);
      console.log("before save ",googleDriveFileEntity )
    await this.repository.save(googleDriveFileEntity);
    await AppDataSource.destroy();
  }
  async deleteFile(fileName: string): Promise<void> {
    await AppDataSource.initialize();
    await this.repository.delete({ fileName });
    await AppDataSource.destroy();
  }
  async getFile(fileName: string): Promise<GoogleDriveFile[]> {
    await AppDataSource.initialize();
    const googleDriveFileEntities: GoogleDriveFileEntity[] =
      await this.repository.findBy({ fileName });
    await AppDataSource.destroy();
    return googleDriveFileEntities.map((file) =>
      GoogleDriveFileMapper.toDomainEntity(file)
    );
  }
  async updateFile(fileName: string, newFileName: string): Promise<void> {
    await AppDataSource.initialize();
    await this.repository.update({ fileName }, { fileName: newFileName });
    await AppDataSource.destroy();
  }
}
