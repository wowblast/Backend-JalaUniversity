import { config } from "../../../config";
import { HttpStatusCode } from "../errorHandling/errorHandler";
import { AccountService } from "../services/coreServices/accountService";

export const getAccounts = async (req, res, next): Promise<void> => {
  try {
    const accountService = new AccountService();
    const accountsFounded = await accountService.getAllAccounts();
    res.status(HttpStatusCode.OK).json({
      statusCode: HttpStatusCode.OK,
      message: config.httpBasicResponses.getAccounts,
      accountsFounded: accountsFounded
    });
  } catch (err) {
    next(err)
  }
};
