import { ErrorHandler } from "../errorHandling/errorHandler";
import { AccountRepositoryImplementation } from "../Infrastructure/mongodb/accountRepositoryImplementation";
export = async (req, res, next) => {
  const accountRepositoryImplementation: AccountRepositoryImplementation =
    new AccountRepositoryImplementation();
  const accounts = await accountRepositoryImplementation.getAllAccounts();
  if (accounts.length == 0) {
    const errorHandler = new ErrorHandler(new Error("NO ACCOUNTS TO UPLOAD"));
    const errorMessage = errorHandler.createErrorResponse();
    res.status(errorMessage.statusCode).json(errorMessage);
  } else {
    next();
  }
};
