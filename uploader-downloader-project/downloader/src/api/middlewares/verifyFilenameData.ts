import { ErrorHandler } from '../errorHandling/errorHandler';
export = (req, res, next) => {
  if(haveCorrectData(req.body.fileName)) {
    next();
  } else {
    const errorHandler = new ErrorHandler(new Error("NO FILENAME"));
    const errorMessage = errorHandler.createErrorResponse()  ;
    res.status(errorMessage.statusCode).json(errorMessage);
  }
};

function haveCorrectData(data: string) {
  return data != null && data != undefined && data != "";
}