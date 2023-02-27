import { ErrorHandler } from "../errorHandling/errorHandler";
export = (req, res, next) => {
  if (
    haveCorrectData(req.body.fileName) &&
    haveCorrectData(req.body.dateReport) &&
    haveCorrectData(req.body.downloadedAmountInBytes) &&
    haveCorrectData(req.body.downloadedFilesAmount) &&
    haveCorrectData(req.body.email)
  ) {
    next();
  } else {
    const errorHandler = new ErrorHandler(new Error("BAD REQUEST"));
    const errorMessage = errorHandler.createErrorResponse();
    res.status(errorMessage.statusCode).json(errorMessage);
  }
};

function haveCorrectData(data: string) {
  return data != null && data != undefined && data != "";
}
