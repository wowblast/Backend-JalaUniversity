import { File } from "../../services/entities/file"
export interface GoogleDriveAction {
    method: string,
    file: File
    newFileName?: string
}