import app from './Api/';
import { GridFsManager } from './api/Infrastructure/mongodb/gridFsManager';
import { RabbitMqController } from './api/Infrastructure/rabbitmq/rabbitMQcontroller';
const port = '3001';
GridFsManager.getInstance()
RabbitMqController.getInstance().initializateRabbitMQ()

app.listen(port, () => {
    console.log(`Uploader service is running on port ${port}.`);
  });