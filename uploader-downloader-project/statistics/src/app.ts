import app from './Api/';
import { RabbitMqController } from './api/rabbitMQcotroller/rabbitMQcontroller';
const port = '3000';
RabbitMqController.getInstance().initializateRabbitMQ()

/*app.listen(port, () => {
    console.log(`statistics service is running on port ${port}.`);
  });*/