import { Repository } from 'typeorm';
import { FileData } from '../../services/entities/fileData';
import { FileDataRepository } from '../../services/interfaces/fileDataRepository';
import { SingletonAppDataSource } from './datasource';
import { FileDataEntity } from './entities/fileDataEntity';
import { FileDataMapper } from '../mappers/fileDataMapper';
export class FileDataRepositoryImplementation implements FileDataRepository {
    private repository: Repository<FileDataEntity>;

    constructor () {
        this.repository = SingletonAppDataSource.getInstance().getAppDataSource().getRepository(FileDataEntity);
      }
    async insertFileData(fileData: FileData): Promise<void> {
        const fileDataEntity = FileDataMapper.toMongoEntity(fileData);
        await this.repository.save(fileDataEntity)
    }
    async deleteFileData(fileName: string): Promise<void> {
        await this.repository.delete({fileName})
    }
    async getFileData(fileName: string): Promise<FileData> {
        const fileDatFound: FileDataEntity = await this.repository.findOneBy({
            fileName
          });
          return fileDatFound
    }
    async updateFileData(fileData: FileData): Promise<void> {
        const fileDataFound = await this.repository.findOneBy({
            fileName: fileData.fileName
          });
          fileDataFound.id = fileData.id;
          fileDataFound.downloadedData = fileData.downloadedData;
        await this.repository.save(fileDataFound);
    }
    
}