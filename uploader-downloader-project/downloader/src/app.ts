import app from './Api/';
import { AppDataSource } from './api/infraestructure/postresql/datasource';
import { RabbitMqController } from './api/infraestructure/rabbitMQ/rabbitMQcontroller';
const port = '3002';
AppDataSource.initialize();

RabbitMqController.getInstance().initializateRabbitMQ()

app.listen(port, () => {
    console.log(`Downloader service is running on port ${port}.`);
  });