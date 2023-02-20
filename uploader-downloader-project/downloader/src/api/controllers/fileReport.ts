import { FileReportService } from "../services/coreServices/fileReportService";
import { FileReport } from "../services/entities/fileReport";
export const getFileReports = async (req, res): Promise<void> => {
  try {
    const fileReport = new FileReportService();
    const reportsFounded = await fileReport.getFileReportByFileName(
      req.body.fileName
    );
    res.json({
      status: "200",
      fileName: req.body.fileName,
      report: reportsFounded,
    });
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
    await fileReportService.createNewReport(fileReport);

    res.json({ status: "200", message: "reportCreated" });
  } catch (err) {
    res.status(500).send(err);
  }
};
