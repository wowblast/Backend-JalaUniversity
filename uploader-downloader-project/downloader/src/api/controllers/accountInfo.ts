import { AccountService } from '../services/coreServices/accountService';



  
  


  

  export const getAccounts = async (req, res): Promise<void> => {
    try {
      const accountService = new AccountService()
      const accountsFounded = await accountService.getAllAccounts()

      res.json({status:'ok', accountsFounded: accountsFounded});
    } catch (err) {
      res.status(500).send(err);
    }
  };
  
  