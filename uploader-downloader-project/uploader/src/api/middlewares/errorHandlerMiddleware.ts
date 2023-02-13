import { ErrorHandler } from "../errorHandling/errorHandler";

const ErrorHandlerMiddleware = (err, req, res, next) => {
    console.log("Middleware Error Hadnling");
    const errorHandler = new ErrorHandler(err);
    const errorMessage = errorHandler.createErrorResponse();
    res.status(errorMessage.statusCode).json(errorMessage);
}

export default ErrorHandlerMiddleware