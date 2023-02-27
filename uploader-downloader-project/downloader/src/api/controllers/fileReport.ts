import { FileReportService } from "../services/coreServices/fileReportService";
import { FileReport } from "../services/entities/fileReport";
import { FileDataService } from '../services/coreServices/fileDataService';
import { InfluxDbController } from "../influxDBController/influxDBcontroller";
import { config } from "../../../config";
export const getFileReports = async (req, res): Promise<void> => {
  try {
    const fileReport = new FileReportService();
    const fileDataService = new FileDataService();
    const reportsFounded = await fileReport.getFileReportByFileName(
      req.body.fileName
    );
    const fileData = await fileDataService.getFileData(req.body.fileName);
    console.log("filedata", fileData)
    if(fileData) {
      InfluxDbController.getInstance().initInfluxDB()
      await InfluxDbController.getInstance().saveActionStatus(config.actionTypes.getFileReport);
      res.json({
        status: "200",
        fileName: fileData.fileName,
        totalDownloaded:  fileData.downloadedData,
        report: reportsFounded,
      });

    } else {
      res.json({status:'202', message: 'file not found'});
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export const createFiletReport = async (req, res): Promise<void> => {
  try {
    const fileReportService = new FileReportService();
    const fileReport: FileReport = new FileReport();
    fileReport.fileName = req.body.fileName;
    fileReport.dateReport = req.body.dateReport;
    fileReport.downloadedAmountInBytes = req.body.downloadedAmountInBytes;
    fileReport.downloadedFilesAmount = req.body.downloadedFilesAmount;
    fileReport.email = req.body.email;
    console.log("creatin file report", fileReport)
    await fileReportService.createNewReport(fileReport);
    InfluxDbController.getInstance().initInfluxDB()
    await InfluxDbController.getInstance().saveActionStatus(config.actionTypes.createAccountReport);
    res.json({ status: "200", message: "reportCreated" });
  } catch (err) {
    res.status(500).send(err);
  }
};
