import { config } from "../../../config";
import { HttpStatusCode } from "../errorHandling/errorHandler";
import { InfluxDbController } from "../influxDBController/influxDBcontroller";
import { GoogleDriveFileService } from "../services/coreServices/googleDriveFileService";

export const downloadFile = async (req, res, next): Promise<void> => {
  try {
    if (req.body.fileName) {
      const googleDriveFileService: GoogleDriveFileService =
        new GoogleDriveFileService();
      const files = await googleDriveFileService.getFileByFileName(
        req.body.fileName
      );
      InfluxDbController.getInstance().initInfluxDB();
      await InfluxDbController.getInstance().saveActionStatus(
        config.actionTypes.downloadFile
      );
      res.status(HttpStatusCode.OK).json({
        statusCode: HttpStatusCode.OK,
        message: config.httpBasicResponses.fileLinksFound,
        filesLink: files || null,
      });
    } else {
      res.status(HttpStatusCode.NOT_FOUND).json({
        statusCode: HttpStatusCode.NOT_FOUND,
        message: config.httpBasicResponses.fileLinksNotFound,
        filesLink: null,
      });
    }
  } catch (err) {
    next(err);
  }
};

export const listFiles = async (req, res, next): Promise<void> => {
  try {
    const googleDriveFileService: GoogleDriveFileService =
      new GoogleDriveFileService();
    const files = await googleDriveFileService.getAllFiles();
    res.status(HttpStatusCode.OK).json({
      statusCode: HttpStatusCode.OK,
      message: config.httpBasicResponses.filesFound,
      files: files || null       
    });
  } catch (err) {
    next(err);
  }
};
