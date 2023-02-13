import { GoogleDriveFile } from '../entities/googleDriveFile';
export interface GoogleDriveRepository {
    insertFile(googleDriveFile: GoogleDriveFile): Promise<void>;
    deleteFile(fileName: string): Promise<void>;
    getFile(fileName: string): Promise<GoogleDriveFile[]>;
    updateFile(fileName: string, newFileName: string): Promise<void>;
}