import { AccountReportService } from '../services/coreServices/accountReportService';
import { AccountReport } from '../services/entities/accountReport';
import { AccountService } from '../services/coreServices/accountService';
import { InfluxDbController } from '../influxDBController/influxDBcontroller';
import { config } from '../../../config';
export const getAccountReport = async (req, res): Promise<void> => {
    try {
      const accountReportService = new AccountReportService()
      const accountService = new AccountService()

      const reportsFounded = await accountReportService.getAccountReports(req.body.email)
      const accountInfo = await accountService.getAccount(req.body.email)
      if(accountInfo) {
        InfluxDbController.getInstance().initInfluxDB()
        await InfluxDbController.getInstance().saveActionStatus(config.actionTypes.getAccountReport);

        res.json({status:'200', email: req.body.email , totalDownloaded: accountInfo.downloadedData, reports:reportsFounded});


      } else {
        res.json({status:'202', message: 'account not found'});

      }

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
    InfluxDbController.getInstance().initInfluxDB()
    await InfluxDbController.getInstance().saveActionStatus(config.actionTypes.createAccountReport);
    res.json({status:'200', message: "reportCreated"});
  } catch (err) {
    res.status(500).send(err);
  }
};