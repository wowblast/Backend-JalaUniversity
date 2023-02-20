import { FileReport } from '../entities/fileReport';
export interface FileReportRepository {
    insertFileReportt(fileReport: FileReport): Promise<void>;
    deleteFileReport(id: number): Promise<void>;
    getFileReportByDate(date: string): Promise<FileReport>;
    getFileReportByFileName(fileName:string):Promise<FileReport[]>
}