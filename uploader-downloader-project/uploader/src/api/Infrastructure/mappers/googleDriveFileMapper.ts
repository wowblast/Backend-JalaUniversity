import { GoogleDriveFileEntity } from "../mongodb/entities/googleDriveFileEntity";
import { GoogleDriveFile } from "../../services/entities/googleDriveFile";

export class GoogleDriveFileMapper {
  public static toDomainEntity(
    googleDriveFileEntity: GoogleDriveFileEntity
  ): GoogleDriveFile {
    const googleDriveFile = new GoogleDriveFile();
    googleDriveFile._id = googleDriveFileEntity._id;
    googleDriveFile.directDownloadLink =
      googleDriveFileEntity.directDownloadLink;
    googleDriveFile.email = googleDriveFileEntity.email;
    googleDriveFile.fileName = googleDriveFileEntity.fileName;
    googleDriveFile.webViewLink = googleDriveFileEntity.webViewLink;
    googleDriveFile.fileId = googleDriveFileEntity.fileId;
    googleDriveFile.fileSize = googleDriveFileEntity.fileSize;

    return googleDriveFile;
  }

  public static toMongoEntity(
    googleDriveFile: GoogleDriveFile
  ): GoogleDriveFileEntity {
    const googleDriveFileEntity = new GoogleDriveFileEntity();
    googleDriveFileEntity._id = googleDriveFile._id;
    googleDriveFileEntity.directDownloadLink =
      googleDriveFile.directDownloadLink;
    googleDriveFileEntity.email = googleDriveFile.email;
    googleDriveFileEntity.fileName = googleDriveFile.fileName;
    googleDriveFileEntity.webViewLink = googleDriveFile.webViewLink;
    googleDriveFileEntity.fileId = googleDriveFile.fileId;
    googleDriveFileEntity.fileSize = googleDriveFile.fileSize;

    return googleDriveFileEntity;
  }
}
