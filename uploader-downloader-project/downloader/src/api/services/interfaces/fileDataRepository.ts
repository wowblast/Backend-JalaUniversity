import { FileData } from '../entities/fileData';
export interface FileDataRepository {
    insertFileData(fileData: FileData): Promise<void>;
    deleteFileData(fileName: string): Promise<void>;
    getFileData(fileName: string): Promise<FileData>;
    updateFileData(fileData: FileData): Promise<void>;
}