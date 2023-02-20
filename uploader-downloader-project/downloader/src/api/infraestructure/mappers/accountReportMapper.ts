import { AccountReportEntity } from '../postresql/entities/accountReportEntity';
import { AccountReport } from '../../services/entities/accountReport';
export class AccountReportMapper {
    public static toDomainEntity(accountReportEntity: AccountReportEntity): AccountReport {
      const accountReport = new AccountReport();
      accountReport.id = accountReportEntity.id;
      accountReport.email = accountReportEntity.email;
      accountReport.dateReport = accountReportEntity.dateReport;
      accountReport.downloadedAmountInBytes = accountReportEntity.downloadedAmountInBytes;
      accountReport.downloadedFilesAmount = accountReportEntity.downloadedFilesAmount;
      return accountReport;
    }
  
    public static toMongoEntity(accountReport: AccountReport): AccountReportEntity {
      const accountReportEntity = new AccountReportEntity();
      accountReportEntity.id = accountReport.id;
      accountReportEntity.email = accountReport.email;
      accountReportEntity.dateReport = accountReport.dateReport;
      accountReportEntity.downloadedAmountInBytes = accountReport.downloadedAmountInBytes;
      accountReportEntity.downloadedFilesAmount = accountReport.downloadedFilesAmount;
      return accountReportEntity;
    }
  }