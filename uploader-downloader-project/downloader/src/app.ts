import app from './Api/';
import { RabbitMqController } from './api/infraestructure/rabbitMQ/rabbitMQcontroller';
const port = '3002';
RabbitMqController.getInstance().initializateRabbitMQ()

app.listen(port, () => {
    console.log(`Downloader service is running on port ${port}.`);
  });