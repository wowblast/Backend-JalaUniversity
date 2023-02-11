import { FileData } from '../mongodb/entities/fileData';
import { File } from '../../services/entities/file';
export class FileMapper {

    public static toDomainEntity(fileData: FileData): File{
        const file = new File()
        file._id = fileData._id;
        file.contentType = fileData.contentType;
        file.filename = fileData.filename;
        file.size = fileData.length;
        file.status = fileData.status
        file.uploadDate = fileData.uploadDate
        return file
    }
}