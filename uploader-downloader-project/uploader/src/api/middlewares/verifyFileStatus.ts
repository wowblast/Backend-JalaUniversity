import { ErrorHandler } from '../errorHandling/errorHandler';
export = (req, res, next) => {
  if(req.file) {
    next();
  } else {
    const errorHandler = new ErrorHandler(new Error("NO FILE TO UPLOAD"));
    const errorMessage = errorHandler.createErrorResponse()  ;
    res.status(errorMessage.statusCode).json(errorMessage);
  }
};

