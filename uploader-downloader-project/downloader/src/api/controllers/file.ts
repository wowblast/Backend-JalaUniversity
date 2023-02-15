import { GoogleDriveFileService } from "../services/coreServices/googleDriveFileService";

export const downloadFile = async (req, res): Promise<void> => {
  try {
    console.log("downlaod con ", req.params.fileName)
    if (req.params.fileName) {
      const googleDriveFileService: GoogleDriveFileService =
        new GoogleDriveFileService();
      const files = await googleDriveFileService.getFileByFileName(
        req.params.fileName
      );
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
