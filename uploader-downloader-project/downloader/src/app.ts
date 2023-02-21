import "reflect-metadata";

import app from "./Api/";
import { SingletonAppDataSource } from "./api/infraestructure/postresql/datasource";
import { RabbitMqController } from "./api/infraestructure/rabbitMQ/rabbitMQcontroller";
const port = "3002";

app.listen(port, async () => {
  await SingletonAppDataSource.getInstance().intiazilateAppDataSource();

  await RabbitMqController.getInstance().initializateRabbitMQ();


  console.log(`Downloader service is running on port ${port}.`);
});
