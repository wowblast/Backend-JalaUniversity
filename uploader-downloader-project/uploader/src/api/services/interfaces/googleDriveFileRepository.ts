import { GoogleDriveFile } from '../entities/googleDriveFile';
export interface GoogleDriveFileRepository {
    insertFile(googleDriveFile: GoogleDriveFile): Promise<void>;
    deleteFile(fileName: string): Promise<void>;
    getFile(fileName: string): Promise<GoogleDriveFile[]>;
    updateFile(fileName: string, newfIleName: string): Promise<void>;
}