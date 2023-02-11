import { AccountService } from '../services/coreServices/accountService';
import { Account } from '../services/entities/account';


export const createAccount = async (req, res): Promise<void> => {
    try {
      const accountService = new AccountService()
      console.log(req.body)
      const newAccount = new Account()
      newAccount.apiKey = req.body.apiKey;
      newAccount.email = req.body.email;
      newAccount.googleApiKey = req.body.googleApiKey;
      newAccount.name = req.body.name;

      await accountService.InsertAccount(newAccount)
      res.json({createAccount:'ok'});
    } catch (err) {
      res.status(500).send(err);
    }
  };
  
  export const removeAccount = async (req, res): Promise<void> => {
    try {
      const accountService = new AccountService()
      await accountService.DeleteAccount(req.body.email)
      res.json({removeAccount:'ok'});
    } catch (err) {
      res.status(500).send(err);
    }
  };
  

  export const updateAccount = async (req, res): Promise<void> => {
    try {
      const accountService = new AccountService()
      console.log(req.body)
      const newAccount = new Account()
      newAccount.apiKey = req.body.apiKey;
      newAccount.email = req.body.email;
      newAccount.googleApiKey = req.body.googleApiKey;
      newAccount.name = req.body.name;

      await accountService.UpdateAccount(newAccount)
      res.json({updateAccount:'ok'});
    } catch (err) {
      res.status(500).send(err);
    }
  };
  

  export const getAccount = async (req, res): Promise<void> => {
    try {
      const accountService = new AccountService()
      const account =  await accountService.GetAccount(req.body.email)
      
      console.log("ready")

      res.json({getAccount:'ok', account});
    } catch (err) {
      res.status(500).send(err);
    }
  };
  
  