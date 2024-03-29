import { AccountService } from "../services/coreServices/accountService";
import { Account } from "../services/entities/account";
import { HttpStatusCode } from "../errorHandling/errorHandler";
import { InfluxDbController } from "../influxDBController/influxDBcontroller";
import { config } from "../../../config";

export const createAccount = async (req, res, next): Promise<void> => {
  try {
    const accountService = new AccountService();
    const newAccount = new Account();
    newAccount.email = req.body.email;
    newAccount.clientId = req.body.clientId;
    newAccount.clientSecret = req.body.clientSecret;
    newAccount.redirectUri = req.body.redirectUri;
    newAccount.refrestToken = req.body.refrestToken;


    const accountFound = await accountService.getAccount(req.body.email);

    if (accountFound) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        statusCode: HttpStatusCode.BAD_REQUEST,
        message: config.httpBasicResponses.accountExist,
      });
    } else {
      
      await accountService.insertAccount(newAccount);
      InfluxDbController.getInstance().initInfluxDB();
      await InfluxDbController.getInstance().saveActionStatus(
        config.actionTypes.createAccount
      );
      res.status(HttpStatusCode.CREATED).json({
        statusCode: HttpStatusCode.CREATED,
        message: config.httpBasicResponses.createAccount,
      });
    }
  } catch (err) {
    next(err);
  }
};

export const removeAccount = async (req, res, next): Promise<void> => {
  try {
    const accountService = new AccountService();
    const account = await accountService.getAccount(req.body.email);
    if (account) {
      await accountService.deleteAccount(req.body.email);
      InfluxDbController.getInstance().initInfluxDB();
      await InfluxDbController.getInstance().saveActionStatus(
        config.actionTypes.deleteAccount
      );
      res.status(HttpStatusCode.OK).json({
        statusCode: HttpStatusCode.OK,
        message: config.httpBasicResponses.deleteAccount,
      });
    } else {
      res.status(HttpStatusCode.NOT_FOUND).json({
        statusCode: HttpStatusCode.OK,
        message: config.httpBasicResponses.accountNotFound,
      });
    }
  } catch (err) {
    next(err);
  }
};

export const updateAccount = async (req, res, next): Promise<void> => {
  try {
    const accountService = new AccountService();
    const newAccount = new Account();
    newAccount.email = req.body.email;
    newAccount.clientId = req.body.clientId;
    newAccount.clientSecret = req.body.clientSecret;
    newAccount.redirectUri = req.body.redirectUri;
    newAccount.refrestToken = req.body.refrestToken;
    await accountService.updateAccount(newAccount);
    res.status(HttpStatusCode.OK).json({
      statusCode: HttpStatusCode.OK,
      message: config.httpBasicResponses.updateAccount,
    });
  } catch (err) {
    next(err);
  }
};

export const getAccount = async (req, res, next): Promise<void> => {
  try {
    const accountService = new AccountService();
    const account = await accountService.getAccount(req.body.email);
    res.status(HttpStatusCode.OK).json({
      statusCode: HttpStatusCode.OK,
      message: config.httpBasicResponses.accountFound,
      account,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllAccounts = async (req, res, next): Promise<void> => {
  try {
    const accountService = new AccountService();
    const accounts = await accountService.getAllAccounts();
    res.status(HttpStatusCode.OK).json({
      statusCode: HttpStatusCode.OK,
      message: config.httpBasicResponses.accountFound,
      accounts: accounts,
    });
  } catch (err) {
    next(err);
  }
};
