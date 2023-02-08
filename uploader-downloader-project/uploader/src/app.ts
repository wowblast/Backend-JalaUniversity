import app from './Api/';
import { RabbitMqController } from './api/rabbitmq/rabbitMQcontroller';
const port = '3001';
RabbitMqController.getInstance().initializateRabbitMQ()


app.listen(port, () => {
    console.log(`Uploader service is running on port ${port}.`);
  });