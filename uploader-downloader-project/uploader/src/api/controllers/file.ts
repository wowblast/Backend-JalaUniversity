

import { HttpStatusCode } from '../errorHandling/errorHandler';
import { InfluxDbController } from '../influxDBController/influxDBcontroller';
import { FileService } from '../services/coreServices/fileService';
import { config } from '../../../config';
export const uploadFile = async (req, res, next): Promise<void> => {
  try {
    if(req.file) {
      const fileName = new Date().getTime() + req.file.originalname;
      
      const fileService = new FileService();
      await fileService.uploadFile(req.file.fileName);
      InfluxDbController.getInstance().initInfluxDB()
      await InfluxDbController.getInstance().saveActionStatus(config.actionTypes.createFileData)
      res.status(HttpStatusCode.CREATED).json({
        statusCode: HttpStatusCode.CREATED,
        message: 'File Uploaded',
        fileStatus: 'Pending'
      });

    } else {
      throw new Error("NO FILE")
    }
  } catch (err) {
    next(err);
  }
};

export const getFile = async (req, res, next): Promise<void> => {
  console.log("getting file")
  try {
    const fileService = new FileService()
    const [fileFound, googleDriveFiles] = await fileService.getFile(req.body.filename);
    res.status(HttpStatusCode.OK).json({
      statusCode: HttpStatusCode.OK,
      message: 'File Found',
      file: fileFound,
      googleDriveFiles: googleDriveFiles
    });
  } catch (err) {
    next(err);
  }
};

export const deleteFile = async (req, res, next): Promise<void> => {
  console.log("deleting file")
  try {
    const fileService = new FileService()
    await fileService.deleteFile(req.body.filename);
    InfluxDbController.getInstance().initInfluxDB()
      await InfluxDbController.getInstance().saveActionStatus(config.actionTypes.deleteFile)
    res.status(HttpStatusCode.OK).json({
      statusCode: HttpStatusCode.OK,
      message: 'File Deleted'
    });
  } catch (err) {
    next(err);
  }
};

