import { FileReportRepositoryImplementation } from '../../infraestructure/postresql/fileReportRepositoryImplementation';
import { FileReport } from '../entities/fileReport';
export class FileReportService {
    private fileReportRepositoryImplementation: FileReportRepositoryImplementation
    constructor () {
        this.fileReportRepositoryImplementation = new FileReportRepositoryImplementation()
    }

    async getFileReportByFileName(fileName: string): Promise<FileReport[]> {
        this.fileReportRepositoryImplementation = new FileReportRepositoryImplementation()
        const fileReportsFound = await this.fileReportRepositoryImplementation.getFileReportByFileName(fileName)
        return fileReportsFound;
    }

    async createNewReport(fileReport: FileReport) {
        const reportFound = await this.fileReportRepositoryImplementation.getFileReportByDate(fileReport.dateReport)
        if(reportFound && reportFound.email == fileReport.email) {
            reportFound.downloadedAmountInBytes += fileReport.downloadedAmountInBytes;
            reportFound.downloadedFilesAmount += fileReport.downloadedFilesAmount;
            await this.fileReportRepositoryImplementation.insertFileReportt(reportFound);
        } else {
            await this.fileReportRepositoryImplementation.insertFileReportt(fileReport);
        }
    }


}