import { AccountReportService } from "../services/coreServices/accountReportService";
import { AccountReport } from "../services/entities/accountReport";
import { AccountService } from "../services/coreServices/accountService";
import { InfluxDbController } from "../influxDBController/influxDBcontroller";
import { config } from "../../../config";
import { HttpStatusCode } from "../errorHandling/errorHandler";
export const getAccountReport = async (req, res, next): Promise<void> => {
  try {
    const accountReportService = new AccountReportService();
    const accountService = new AccountService();

    const reportsFounded = await accountReportService.getAccountReports(
      req.body.email
    );
    const accountInfo = await accountService.getAccount(req.body.email);
    if (accountInfo) {
      InfluxDbController.getInstance().initInfluxDB();
      await InfluxDbController.getInstance().saveActionStatus(
        config.actionTypes.getAccountReport
      );
      res.status(HttpStatusCode.OK).json({
        statusCode: HttpStatusCode.OK,
        message: config.httpBasicResponses.accountReportFound,
        email: req.body.email,
        totalDownloaded: accountInfo.downloadedData,
        timeDownloade: accountInfo.timesDownloaded,
        reports: reportsFounded,
      });
    } else {
      res.status(HttpStatusCode.NOT_FOUND).json({
        statusCode: HttpStatusCode.NOT_FOUND,
        message: config.httpBasicResponses.accountReportNotFound,
      });
    }
  } catch (err) {
    next(err);
  }
};

export const createAccountReport = async (req, res, next): Promise<void> => {
  try {
    const accountReportService = new AccountReportService();
    const accountReport: AccountReport = new AccountReport();
    accountReport.email = req.body.email;
    accountReport.dateReport = req.body.dateReport;
    accountReport.downloadedAmountInBytes = req.body.downloadedAmountInBytes;
    accountReport.downloadedFilesAmount = req.body.downloadedFilesAmount;
    await accountReportService.createNewReport(accountReport);
    InfluxDbController.getInstance().initInfluxDB();
    await InfluxDbController.getInstance().saveActionStatus(
      config.actionTypes.createAccountReport
    );
    res.status(HttpStatusCode.CREATED).json({
      statusCode: HttpStatusCode.CREATED,
      message: config.httpBasicResponses.accountReportCreated,
    });
  } catch (err) {
    next(err)
  }
};
