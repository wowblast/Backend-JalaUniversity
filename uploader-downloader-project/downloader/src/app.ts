import "reflect-metadata";

import app from './Api/';
import { SingletonAppDataSource } from './api/infraestructure/postresql/datasource';
import { RabbitMqController } from './api/infraestructure/rabbitMQ/rabbitMQcontroller';
const port = '3002';
SingletonAppDataSource.getInstance().intiazilateAppDataSource()

RabbitMqController.getInstance().initializateRabbitMQ()

app.listen(port, () => {
    console.log(`Downloader service is running on port ${port}.`);
  });