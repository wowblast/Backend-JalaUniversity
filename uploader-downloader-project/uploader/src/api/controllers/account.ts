import { AccountService } from "../services/coreServices/accountService";
import { Account } from "../services/entities/account";

export const createAccount = async (req, res): Promise<void> => {
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
    res.json({ createAccount: "ok" });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const removeAccount = async (req, res): Promise<void> => {
  try {
    const accountService = new AccountService();
    await accountService.DeleteAccount(req.body.email);
    res.json({ removeAccount: "ok" });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateAccount = async (req, res): Promise<void> => {
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
    res.json({ updateAccount: "ok" });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getAccount = async (req, res): Promise<void> => {
  console.log("get account")
  try {
    const accountService = new AccountService();    
    const account = await accountService.GetAccount(req.params.email);
    res.json({ getAccount: "ok", account });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getAllAccounts = async (req, res): Promise<void> => {
  try {
    const accountService = new AccountService();    
    const accounts = await accountService.GetAllAccounts();
    res.json({ getAccount: "ok", accounts: accounts });
  } catch (err) {
    res.status(500).send(err);
  }
};


