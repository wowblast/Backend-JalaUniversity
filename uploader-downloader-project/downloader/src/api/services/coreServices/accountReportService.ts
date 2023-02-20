import { AccountReportRepositoryImplementation } from '../../infraestructure/postresql/accountReportRepositoryImplementation';
import { AccountReport } from '../entities/accountReport';
export class AccountReportService {
    private accountReportRepositoryImplementation: AccountReportRepositoryImplementation
    constructor() {
        this.accountReportRepositoryImplementation = new AccountReportRepositoryImplementation()
    }

    async getAccountReports(email: string): Promise<AccountReport[]> {
        this.accountReportRepositoryImplementation = new AccountReportRepositoryImplementation()
        const accountReports = await this.accountReportRepositoryImplementation.getAccountReportsByEmail(email)
        return accountReports
    }

    async createNewReport(accountReport: AccountReport) {
        const previousReport = await this.accountReportRepositoryImplementation.getAccountReportByDate(accountReport.dateReport)
        if(previousReport) {
            previousReport.downloadedAmountInBytes += accountReport.downloadedAmountInBytes;
            previousReport.downloadedFilesAmount += accountReport.downloadedFilesAmount;
            await this.accountReportRepositoryImplementation.insertAccountReport(previousReport);
        } else {
            await this.accountReportRepositoryImplementation.insertAccountReport(accountReport);
        }
    }
}