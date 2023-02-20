import { AccountReportService } from '../services/coreServices/accountReportService';
import { AccountReport } from '../services/entities/accountReport';
import { AccountService } from '../services/coreServices/accountService';
export const getAccountReport = async (req, res): Promise<void> => {
    try {
      const accountReportService = new AccountReportService()
      const accountService = new AccountService()

      const reportsFounded = await accountReportService.getAccountReports(req.body.email)
      const accountInfo = await accountService.getAccount(req.body.email)

      res.json({status:'200', email: req.body.email , totalDownloaded: accountInfo.downloadedData, reports:reportsFounded});
    } catch (err) {
      res.status(500).send(err);
    }
  };

export const createAccountReport = async (req, res): Promise<void> => {
  try {
    const accountReportService = new AccountReportService()
    const accountReport: AccountReport = new AccountReport()
    accountReport.email = req.body.email;
    accountReport.dateReport = req.body.dateReport;
    accountReport.downloadedAmountInBytes = req.body.downloadedAmountInBytes;
    accountReport.downloadedFilesAmount = req.body.downloadedFilesAmount;
    await accountReportService.createNewReport(accountReport)

    res.json({status:'200', message: "reportCreated"});
  } catch (err) {
    res.status(500).send(err);
  }
};