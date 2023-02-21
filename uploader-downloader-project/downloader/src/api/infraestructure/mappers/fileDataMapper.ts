import { FileDataEntity } from "../postresql/entities/fileDataEntity";
import { FileData } from '../../services/entities/fileData';

export class FileDataMapper {
    public static toDomainEntity(fileDataEntity: FileDataEntity): FileData {
      const fileData = new FileData();
      fileData.id = fileDataEntity.id;
      fileData.fileName = fileDataEntity.fileName;
      fileData.downloadedData = fileDataEntity.downloadedData;
      return fileData;
    }
  
    public static toMongoEntity(fileData: FileData): FileDataEntity {
      const fileDataEntity = new FileDataEntity();
      fileDataEntity.id = fileData.id;
      fileDataEntity.fileName = fileData.fileName;
      fileDataEntity.downloadedData = fileData.downloadedData;
      return fileDataEntity;
    }
  }