import { MongoRepository } from 'typeorm';
import { GoogleDriveFile } from '../../services/entities/googleDriveFile';
import { GoogleDriveFileRepository } from '../../services/interfaces/googleDriveFileRepository';
import { AppDataSource } from './datasource';
import { GoogleDriveFileEntity } from './entities/googleDriveFileEntity';
import { GoogleDriveFileMapper } from '../mappers/googleDriveFileMapper';
export class GoogleDriveFileRepositoryImplementation implements GoogleDriveFileRepository {
    private repository: MongoRepository<GoogleDriveFileEntity>;

  constructor() {
    this.repository = AppDataSource.getMongoRepository(GoogleDriveFileEntity);
  }
    async insertFile(googleDriveFile: GoogleDriveFile): Promise<void> {
        await AppDataSource.initialize();
        const googleDriveFileEntity = GoogleDriveFileMapper.toMongoEntity(googleDriveFile)
        await this.repository.save(googleDriveFileEntity)
        await AppDataSource.destroy()
    }
    async deleteFile(fileName: string): Promise<void> {
        await AppDataSource.initialize();
        await this.repository.deleteMany({fileName})        
        await AppDataSource.destroy();

    }
    async getFile(fileName: string): Promise<GoogleDriveFile[]> {
        await AppDataSource.initialize();
        const files: GoogleDriveFileEntity[]= await this.repository.findBy({fileName})        
        await AppDataSource.destroy();
        return files.map(file => GoogleDriveFileMapper.toDomainEntity(file));
    }
    async updateFile(fileName: string, newfIleName: string): Promise<void> {
        await AppDataSource.initialize();
        await this.repository.updateMany({fileName}, {fileName: newfIleName})        
        await AppDataSource.destroy();
    }
    
}