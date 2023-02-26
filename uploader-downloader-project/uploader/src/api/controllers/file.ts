

import { HttpStatusCode } from '../errorHandling/errorHandler';
import { InfluxDbController } from '../influxDBController/influxDBcontroller';
import { FileService } from '../services/coreServices/fileService';
import { config } from '../../../config';
import { GridFsManager } from '../Infrastructure/mongodb/gridFsManager';
export const uploadFile = async (req, res, next): Promise<void> => {
  try {
    if(req.file) {
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
      message: 'File Data',
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
    const gridFsManager = GridFsManager.getInstance();

    const fileService = new FileService();
    const fileFound = await gridFsManager.getFile(req.body.filename)
    if(!fileFound)
    throw new Error("File not found")

    fileService.deleteFile(req.body.filename);
    InfluxDbController.getInstance().initInfluxDB()
      await InfluxDbController.getInstance().saveActionStatus(config.actionTypes.deleteFile)
    res.status(HttpStatusCode.OK).json({
      statusCode: HttpStatusCode.OK,
      message: 'File deletion in progress'
    });
  } catch (err) {
    next(err);
  }
};

export const updateFile = async (req, res, next): Promise<void> => {
  try {
    const fileService = new FileService();
    await fileService.updateFile(req.body.filename, req.body.newFileName);
   
    res.status(HttpStatusCode.OK).json({
      statusCode: HttpStatusCode.OK,
      message: 'File name update in progress'
    });
  } catch (err) {
    next(err);
  }
};

