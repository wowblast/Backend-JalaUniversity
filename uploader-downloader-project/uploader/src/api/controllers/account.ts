import { AccountService } from "../services/coreServices/accountService";
import { Account } from "../services/entities/account";
import { HttpStatusCode } from "../errorHandling/errorHandler";
import { InfluxDbController } from "../influxDBController/influxDBcontroller";
import { config } from "../../../config";

export const createAccount = async (req, res, next): Promise<void> => {
  try {
    const accountService = new AccountService();
    console.log(req.body);
    const newAccount = new Account();
    newAccount.email = req.body.email;
    newAccount.clientId = req.body.clientId;
    newAccount.clientSecret = req.body.clientSecret;
    newAccount.redirectUri = req.body.redirectUri;
    newAccount.refrestToken = req.body.refrestToken;
    await accountService.InsertAccount(newAccount);
    InfluxDbController.getInstance().initInfluxDB();
    await InfluxDbController.getInstance().saveActionStatus(
      config.actionTypes.createAccount
    );
    res.status(HttpStatusCode.CREATED).json({
      statusCode: HttpStatusCode.CREATED,
      message: "Account Created",
    });
  } catch (err) {
    next(err);
  }
};

export const removeAccount = async (req, res, next): Promise<void> => {
  try {
    const accountService = new AccountService();
    await accountService.DeleteAccount(req.body.email);
    InfluxDbController.getInstance().initInfluxDB();
    await InfluxDbController.getInstance().saveActionStatus(
      config.actionTypes.deleteAccount
    );
    res.status(HttpStatusCode.OK).json({
      statusCode: HttpStatusCode.OK,
      message: "Account Deleted",
    });
  } catch (err) {
    next(err);
  }
};

export const updateAccount = async (req, res, next): Promise<void> => {
  try {
    const accountService = new AccountService();
    console.log(req.body);
    const newAccount = new Account();
    newAccount.email = req.body.email;
    newAccount.clientId = req.body.clientId;
    newAccount.clientSecret = req.body.clientSecret;
    newAccount.redirectUri = req.body.redirectUri;
    newAccount.refrestToken = req.body.refrestToken;
    await accountService.UpdateAccount(newAccount);
    res.status(HttpStatusCode.OK).json({
      statusCode: HttpStatusCode.OK,
      message: "Account Updated",
    });
  } catch (err) {
    next(err);
  }
};

export const getAccount = async (req, res, next): Promise<void> => {
  try {
    const accountService = new AccountService();
    const account = await accountService.GetAccount(req.params.email);
    res.status(HttpStatusCode.OK).json({
      statusCode: HttpStatusCode.OK,
      message: "Account Found",
      account,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllAccounts = async (req, res, next): Promise<void> => {
  try {
    const accountService = new AccountService();
    const accounts = await accountService.GetAllAccounts();
    res.status(HttpStatusCode.OK).json({
      statusCode: HttpStatusCode.OK,
      message: "Account Found",
      accounts: accounts,
    });
  } catch (err) {
    next(err);
  }
};
