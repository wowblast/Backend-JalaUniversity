import { FileReport } from '../../services/entities/fileReport';
import { FileReportEntity } from '../postresql/entities/fileReportEntity';
export class FileReportMapper {
    public static toDomainEntity(fileReportEntity: FileReportEntity): FileReport {
      const fileReport = new FileReport();
      fileReport.id = fileReportEntity.id;
      fileReport.fileName = fileReportEntity.fileName;
      fileReport.dateReport = fileReportEntity.dateReport;
      fileReport.downloadedAmountInBytes = fileReportEntity.downloadedAmountInBytes;
      fileReport.downloadedFilesAmount = fileReportEntity.downloadedFilesAmount;
      fileReport.email = fileReportEntity.email;
      return fileReport;
    }
  
    public static toMongoEntity(fileReport: FileReport): FileReportEntity {
      const fileReportEntity = new FileReportEntity();
      fileReportEntity.id = fileReport.id;
      fileReportEntity.fileName = fileReport.fileName;
      fileReportEntity.dateReport = fileReport.dateReport;
      fileReportEntity.downloadedAmountInBytes = fileReport.downloadedAmountInBytes;
      fileReportEntity.downloadedFilesAmount = fileReport.downloadedFilesAmount;
      fileReportEntity.email = fileReport.email
      return fileReportEntity;
    }
  }