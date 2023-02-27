import { ErrorHandler } from "../errorHandling/errorHandler";
import logger from 'jet-logger';

const ErrorHandlerMiddleware = (err, req, res, next) => {
    logger.warn("Middleware Error Hadnling");
    const errorHandler = new ErrorHandler(err);
    const errorMessage = errorHandler.createErrorResponse();
    res.status(errorMessage.statusCode).json(errorMessage);
}

export default ErrorHandlerMiddleware