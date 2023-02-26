import { Repository } from 'typeorm';
import { AccountReport } from '../../services/entities/accountReport';
import { AccountReportRepository } from '../../services/interfaces/accountReportRepository';
import { SingletonAppDataSource } from './datasource';
import { AccountReportEntity } from './entities/accountReportEntity';
import { AccountReportMapper } from '../mappers/accountReportMapper';

export class AccountReportRepositoryImplementation implements AccountReportRepository {
    private repository: Repository<AccountReportEntity>;

  constructor() {
    this.repository = SingletonAppDataSource.getInstance().getAppDataSource().getRepository(AccountReportEntity);
  }
    async insertAccountReport(accountReport: AccountReport): Promise<void> {
        if (!SingletonAppDataSource.getInstance().getAppDataSource().isInitialized ) {
            await SingletonAppDataSource.getInstance().intiazilateAppDataSource()
        }
        const accountReportEntity = AccountReportMapper.toMongoEntity(accountReport);
        await this.repository.save(accountReportEntity);
    }
    async deleteAccountReport(id: number): Promise<void> {
        if (!SingletonAppDataSource.getInstance().getAppDataSource().isInitialized ) {
            await SingletonAppDataSource.getInstance().intiazilateAppDataSource()
        }
        await this.repository.delete(id);
    }
    async getAccountReportByDateAndEmail(date: string, email: string): Promise<AccountReport> {
        if (!SingletonAppDataSource.getInstance().getAppDataSource().isInitialized ) {
            await SingletonAppDataSource.getInstance().intiazilateAppDataSource()
        }
        const accountReportFound = await this.repository.findOneBy({dateReport:date, email})
        return accountReportFound ? AccountReportMapper.toDomainEntity(accountReportFound): null
    }
    async getAccountReportsByEmail(email: string): Promise<AccountReport[]> {
        if (!SingletonAppDataSource.getInstance().getAppDataSource().isInitialized ) {
            await SingletonAppDataSource.getInstance().intiazilateAppDataSource()
        }
        const accountReportsFound = await this.repository.findBy({email});
        return accountReportsFound ? accountReportsFound.map(accountReport => AccountReportMapper.toDomainEntity(accountReport)) : [];
    }
  
}