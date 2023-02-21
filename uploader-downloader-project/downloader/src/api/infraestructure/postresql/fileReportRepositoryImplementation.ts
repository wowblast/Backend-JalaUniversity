import { Repository } from "typeorm";
import { FileReport } from "../../services/entities/fileReport";
import { FileReportMapper } from "../mappers/fileReportMapper";
import { SingletonAppDataSource } from "./datasource";
import { FileReportEntity } from './entities/fileReportEntity';
import { FileReportRepository } from '../../services/interfaces/fileReportRepository';

export class FileReportRepositoryImplementation implements FileReportRepository {
    private repository: Repository<FileReportEntity>;

  constructor() {
    this.repository = SingletonAppDataSource.getInstance().getAppDataSource().getRepository(FileReportEntity);
  }
    async getFileReportByDate(date: string): Promise<FileReport> {
        if (!SingletonAppDataSource.getInstance().getAppDataSource().isInitialized ) {
            await SingletonAppDataSource.getInstance().intiazilateAppDataSource()
        }
        const fileReportFounded = await this.repository.findOneBy({dateReport:date});
        return fileReportFounded? FileReportMapper.toDomainEntity(fileReportFounded): null;
    }
    async insertFileReportt(fileReport: FileReport): Promise<void> {
        if (!SingletonAppDataSource.getInstance().getAppDataSource().isInitialized ) {
            await SingletonAppDataSource.getInstance().intiazilateAppDataSource()
        }     
        const fileReportEntity = FileReportMapper.toMongoEntity(fileReport);
        await this.repository.save(fileReportEntity);
    }
    async deleteFileReport(id: number): Promise<void> {
        if (!SingletonAppDataSource.getInstance().getAppDataSource().isInitialized ) {
            await SingletonAppDataSource.getInstance().intiazilateAppDataSource()
        }
        await this.repository.delete({id});
    }
   
    async getFileReportByFileName(fileName: string): Promise<FileReport[]> {
        if (!SingletonAppDataSource.getInstance().getAppDataSource().isInitialized ) {
            await SingletonAppDataSource.getInstance().intiazilateAppDataSource()
        }       
        const fileReportsFounded = await this.repository.findBy({fileName});      
        return fileReportsFounded? fileReportsFounded.map(fileReport => FileReportMapper.toDomainEntity(fileReport)): [];
    }
}