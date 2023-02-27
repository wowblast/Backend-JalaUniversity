import { Router } from "express";
import {
  createAccount,
  getAccount,
  removeAccount,
  updateAccount,
  getAllAccounts,
} from "../controllers/account";
import ErrorHandlerMiddleware from "../middlewares/errorHandlerMiddleware";
const routes = Router();
import verifyAccountData from "../middlewares/verifyAccountData";
import verifyAccountEmail from "../middlewares/verifyAccountEmail";

routes.get("/information", getAccount);
routes.get("/", getAllAccounts);
routes.post("/", verifyAccountData, createAccount);
routes.put("/", verifyAccountData, updateAccount);
routes.delete("/", verifyAccountEmail, removeAccount);
routes.use(ErrorHandlerMiddleware);

export default routes;
