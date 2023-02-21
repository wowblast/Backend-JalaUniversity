import { config } from "../../../config";
import { InfluxDbController } from "../influxDBController/influxDBcontroller";
import { GoogleDriveFileService } from "../services/coreServices/googleDriveFileService";

export const downloadFile = async (req, res): Promise<void> => {
  try {
    console.log("downlaod con ", req.body.fileName)
    if (req.body.fileName) {
      const googleDriveFileService: GoogleDriveFileService =
        new GoogleDriveFileService();
      const files = await googleDriveFileService.getFileByFileName(
        req.body.fileName
      );
      InfluxDbController.getInstance().initInfluxDB()
      await InfluxDbController.getInstance().saveActionStatus(config.actionTypes.downloadFile);
      res.json({ fileLinks: files || null, status: "200" });
    } else {
      res.json({ fileLinks: ['null'], status: "500" });


    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export const listFiles = async (req, res): Promise<void> => {
  try {
    const googleDriveFileService: GoogleDriveFileService =
      new GoogleDriveFileService();
    const files = await googleDriveFileService.getAllFiles();
    res.json({ files: files, status: "200" });
  } catch (err) {
    res.status(500).send(err);
  }
};
