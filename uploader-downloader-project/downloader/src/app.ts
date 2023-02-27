import "reflect-metadata";
import logger from 'jet-logger';

import app from "./Api/";
import { SingletonAppDataSource } from "./api/infraestructure/postresql/datasource";
import { RabbitMqController } from "./api/infraestructure/rabbitMQ/rabbitMQcontroller";
const port = "3002";

app.listen(port, async () => {
  const dataSource = SingletonAppDataSource.getInstance();
  await dataSource.intiazilateAppDataSource();
  await RabbitMqController.getInstance().initializateRabbitMQ();

  logger.imp(`Downloader service is running on port ${port}.`)
});
