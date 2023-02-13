import { GoogleDriveFileService } from '../services/coreServices/googleDriveFileService';


export const downloadFile = async (req, res): Promise<void> => {
  try {
    res.json({uploadFile: 'pending', status: 'ok'});
  } catch (err) {
    res.status(500).send(err);
  }
};

export const listFile = async (req, res): Promise<void> => {
  try {
    const googleDriveFileService: GoogleDriveFileService = new GoogleDriveFileService()
    const files = await googleDriveFileService.getFileByFileName(req.body.fileName)
    res.json({fileList:files, status: '200'});
  } catch (err) {
    res.status(500).send(err);
  }
};

