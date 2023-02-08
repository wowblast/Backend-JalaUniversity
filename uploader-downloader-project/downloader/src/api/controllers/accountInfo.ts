import { AccountService } from '../services/coreServices/accountService';
import { AccountEntity } from '../postresql/entities/accountEntity';


export const createAccount = async (req, res): Promise<void> => {
    try {
      const accountService = new AccountService()
      const newAccount = new AccountEntity()
      newAccount.name = req.body.name;
      newAccount.files = req.body.status;
      newAccount.status = req.body.status;
      newAccount.email = req.body.email;
      await accountService.InsertAccount(newAccount)
      res.json({createAccount:'ok'});
    } catch (err) {
      res.status(500).send(err);
    }
  };
  
  export const removeAccount = async (req, res): Promise<void> => {
    try {
      res.json({removeAccount:'ok'});
    } catch (err) {
      res.status(500).send(err);
    }
  };
  

  export const updateAccount = async (req, res): Promise<void> => {
    try {
      res.json({updateAccount:'ok'});
    } catch (err) {
      res.status(500).send(err);
    }
  };
  

  export const getAccount = async (req, res): Promise<void> => {
    try {
      const accountService = new AccountService()
      const accoutFounded = await accountService.GetAccount(req.body.email)

      res.json({getAccount:'ok', accoutFounded});
    } catch (err) {
      res.status(500).send(err);
    }
  };
  
  