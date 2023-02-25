import { FileData } from '../mongodb/entities/fileData';
export interface GoogleDriveAction {
    method: string,
    file: FileData
}