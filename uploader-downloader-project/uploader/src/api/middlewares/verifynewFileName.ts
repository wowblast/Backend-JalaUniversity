import { ErrorHandler } from '../errorHandling/errorHandler';
export = (req, res, next) => {
  if(haveCorrectData(req.body.filename) && haveCorrectData(req.body.newFileName)) {
    next();
  } else {
    const errorHandler = new ErrorHandler(new Error("NO FILENAME OR NEWFILENAME"));
    const errorMessage = errorHandler.createErrorResponse()  ;
    res.status(errorMessage.statusCode).json(errorMessage);
  }
};

function haveCorrectData(data: string) {
  return data != null && data != undefined && data != "";
}