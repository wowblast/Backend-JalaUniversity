import { AccountReport } from '../entities/accountReport';
export interface AccountReportRepository {
    insertAccountReport(accountReport: AccountReport): Promise<void>;
    deleteAccountReport(id: number): Promise<void>;
    getAccountReportByDateAndEmail(date: string, email: string): Promise<AccountReport>;
    getAccountReportsByEmail(email:string):Promise<AccountReport[]>
}