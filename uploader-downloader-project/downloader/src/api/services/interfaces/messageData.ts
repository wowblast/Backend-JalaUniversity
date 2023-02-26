import { GoogleDriveFile } from "../entities/googleDriveFile";

export interface MessageData {
    method: string,
    file: GoogleDriveFile,
    newFileName?: string
}