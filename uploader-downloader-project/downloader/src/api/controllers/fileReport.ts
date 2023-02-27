import { FileReportService } from "../services/coreServices/fileReportService";
import { FileReport } from "../services/entities/fileReport";
import { FileDataService } from "../services/coreServices/fileDataService";
import { InfluxDbController } from "../influxDBController/influxDBcontroller";
import { config } from "../../../config";
import { HttpStatusCode } from "../errorHandling/errorHandler";
export const getFileReports = async (req, res, next): Promise<void> => {
  try {
    const fileReport = new FileReportService();
    const fileDataService = new FileDataService();
    const reportsFounded = await fileReport.getFileReportByFileName(
      req.body.fileName
    );
    const fileData = await fileDataService.getFileData(req.body.fileName);
    if (fileData) {
      InfluxDbController.getInstance().initInfluxDB();
      await InfluxDbController.getInstance().saveActionStatus(
        config.actionTypes.getFileReport
      );
      res.status(HttpStatusCode.OK).json({
        statusCode: HttpStatusCode.OK,
        message: config.httpBasicResponses.fileReportFound,
        fileName: fileData.fileName,
        totalDownloaded: fileData.downloadedData,
        report: reportsFounded,
      });
    } else {
      res.status(HttpStatusCode.NOT_FOUND).json({
        statusCode: HttpStatusCode.NOT_FOUND,
        message: config.httpBasicResponses.fileReportNotFound,
      });
    }
  } catch (err) {
    next(err);
  }
};

export const createFiletReport = async (req, res, next): Promise<void> => {
  try {
    const fileReportService = new FileReportService();
    const fileReport: FileReport = new FileReport();
    fileReport.fileName = req.body.fileName;
    fileReport.dateReport = req.body.dateReport;
    fileReport.downloadedAmountInBytes = req.body.downloadedAmountInBytes;
    fileReport.downloadedFilesAmount = req.body.downloadedFilesAmount;
    fileReport.email = req.body.email;
    await fileReportService.createNewReport(fileReport);
    InfluxDbController.getInstance().initInfluxDB();
    await InfluxDbController.getInstance().saveActionStatus(
      config.actionTypes.createAccountReport
    );
    res.status(HttpStatusCode.OK).json({
      statusCode: HttpStatusCode.OK,
      message: config.httpBasicResponses.fileReportCreated,
    });
  } catch (err) {
    next(err);
  }
};
