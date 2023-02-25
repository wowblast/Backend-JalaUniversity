import { MongoRepository } from "typeorm";
import { GoogleDriveFile } from "../../services/entities/googleDriveFile";
import { GoogleDriveFileRepository } from "../../services/interfaces/googleDriveFileRepository";
import { SingletonAppDataSource } from "./datasource";
import { GoogleDriveFileEntity } from "./entities/googleDriveFileEntity";
import { GoogleDriveFileMapper } from "../mappers/googleDriveFileMapper";
export class GoogleDriveFileRepositoryImplementation
  implements GoogleDriveFileRepository
{
  private repository: MongoRepository<GoogleDriveFileEntity>;
  private dataSourse: SingletonAppDataSource;
  constructor() {
    this.dataSourse = SingletonAppDataSource.getInstance();
    this.repository = this.dataSourse
      .getAppDataSource()
      .getMongoRepository(GoogleDriveFileEntity);
  }
  async insertFile(googleDriveFile: GoogleDriveFile): Promise<void> {
    const googleDriveFileEntity =
      GoogleDriveFileMapper.toMongoEntity(googleDriveFile);
    await this.repository.save(googleDriveFileEntity);
  }
  async deleteFile(fileName: string): Promise<void> {
    await this.repository.deleteMany({ fileName });
  }
  async getFile(fileName: string): Promise<GoogleDriveFile[]> {
    const files: GoogleDriveFileEntity[] = await this.repository.findBy({
      fileName,
    });
    return files.length !== 0
      ? files.map((file) => GoogleDriveFileMapper.toDomainEntity(file))
      : [];
  }
  async updateFile(fileName: string, newfIleName: string): Promise<void> {
    await this.repository.updateMany({ fileName }, { fileName: newfIleName });
  }
}
