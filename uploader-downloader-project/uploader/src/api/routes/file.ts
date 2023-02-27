import { Router } from "express";
import multer from "multer";
import {
  uploadFile,
  getFile,
  deleteFile,
  updateFile,
  getAllFiles
} from "../controllers/file";
import { uploadFileToMongo } from "../Infrastructure/mongodb/gridFsManager";
import ErrorHandlerMiddleware from "../middlewares/errorHandlerMiddleware";
import verifyFilenameData from "../middlewares/verifyFilenameData";
import verifyFileStatus from "../middlewares/verifyFileStatus";
import verifynewFileName from "../middlewares/verifynewFileName";
const upload = multer();

const routes = Router();
routes.get("/file/information",getAllFiles)
routes.get("/file", verifyFilenameData, getFile);
routes.post(
  "/file",
  verifyFileStatus,
  uploadFileToMongo.single("file"),
  uploadFile
);
routes.delete("/file", verifyFilenameData, deleteFile);
routes.put("/file", verifynewFileName, updateFile);
routes.use(ErrorHandlerMiddleware);

export default routes;
