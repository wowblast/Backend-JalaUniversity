

import { FileService } from '../services/coreServices/fileService';
export const uploadFile = async (req, res): Promise<void> => {
  try {
    if(req.file) {
      const fileService = new FileService()
      await fileService.uploadFile(req.file.originalname )
    }
    res.json({uploadFile: 'pending', status: 'ok'});
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getFile = async (req, res): Promise<void> => {
  console.log("getting file")
  try {
    const fileService = new FileService()
    const [fileFound, googleDriveFiles] = await fileService.getFile(req.body.filename);
    res.json({file: fileFound, googleDriveFiles: googleDriveFiles});    
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteFile = async (req, res): Promise<void> => {
  console.log("deleting file")
  try {
    const fileService = new FileService()
    await fileService.deleteFile(req.body.filename);
    //const uploader = new UploaderGridFs()
    //await uploader.deleteFile(req.body.filename)
    res.json({getfile: 'pending', status: 'ok'});

    
  } catch (err) {
    res.status(500).send(err);
  }
};

