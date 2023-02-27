

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
        message: config.httpBasicResponses.fileUploaded,
        fileStatus: config.fileStatus.replicatingState
      });

    } else {
      throw new Error("NO FILE")
    }
  } catch (err) {
    next(err);
  }
};

export const getFile = async (req, res, next): Promise<void> => {
  try {
    const fileService = new FileService()
    const [fileFound, googleDriveFiles] = await fileService.getFile(req.body.filename);
    res.status(HttpStatusCode.OK).json({
      statusCode: HttpStatusCode.OK,
      message: config.httpBasicResponses.fileDataResult,
      file: fileFound,
      googleDriveFiles: googleDriveFiles
    });
  } catch (err) {
    next(err);
  }
};

export const getAllFiles= async (req, res, next): Promise<void> => {
  try {
    const fileService = new FileService()
    const fileFound = await fileService.getAllFiles();
    res.status(HttpStatusCode.OK).json({
      statusCode: HttpStatusCode.OK,
      message: config.httpBasicResponses.fileDataResult,
      files: fileFound,
    
    });
  } catch (err) {
    next(err);
  }
};

export const deleteFile = async (req, res, next): Promise<void> => {
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
      message: config.httpBasicResponses.fileDeleteInProgress
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
      message: config.httpBasicResponses.fileUpdateInProgress
    });
  } catch (err) {
    next(err);
  }
};

