import logger from "jet-logger";

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}

export class ErrorHandler {
  private errorReceived: Error;
  private errorData: { statusCode: HttpStatusCode; message: string };

  constructor(errorReceived: Error) {
    this.errorReceived = errorReceived;
  }

  createErrorResponse() {
    logger.warn("error to handle");
    logger.warn("message");
    logger.warn(this.errorReceived.message);
    logger.warn("cause");
    logger.warn(this.errorReceived.cause);
    logger.warn("name");
    logger.warn(this.errorReceived.name);
    logger.warn("stack");
    logger.warn(this.errorReceived.stack);

    switch (this.errorReceived.name) {
      case "Error":
        this.errorData = {
          statusCode: HttpStatusCode.BAD_REQUEST,
          message: this.errorReceived.message,
        };
        break;
      case "EntityNotFoundError":
        this.errorData = {
          statusCode: HttpStatusCode.NOT_FOUND,
          message: "RESOURCE NOT FOUND",
        };
        break;
      case "TypeError":
        this.errorData = {
          statusCode: HttpStatusCode.NOT_FOUND,
          message: "RESOURCE NOT FOUND",
        };
        break;
      default:
        this.errorData = {
          statusCode: HttpStatusCode.INTERNAL_SERVER,
          message: "Internarl server error",
        };
        break;
    }
    return this.errorData;
  }
}
