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
    await accountService.insertAccount(newAccount);
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
    const account = await accountService.getAccount(req.body.email);
    console.log("email to remove", account);

    if (account) {
      await accountService.deleteAccount(req.body.email);
      InfluxDbController.getInstance().initInfluxDB();
      await InfluxDbController.getInstance().saveActionStatus(
        config.actionTypes.deleteAccount
      );
      res.status(HttpStatusCode.OK).json({
        statusCode: HttpStatusCode.OK,
        message: "Account Deleted",
      });
    } else {
      res.status(HttpStatusCode.NOT_FOUND).json({
        statusCode: HttpStatusCode.OK,
        message: "Account not found",
      });
    }
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
    await accountService.updateAccount(newAccount);
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
    const account = await accountService.getAccount(req.params.email);
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
    const accounts = await accountService.getAllAccounts();
    res.status(HttpStatusCode.OK).json({
      statusCode: HttpStatusCode.OK,
      message: "Account Found",
      accounts: accounts,
    });
  } catch (err) {
    next(err);
  }
};
