import app from "./Api/";
import { GoogleDriveManager } from "./api/Infrastructure/googledrive/googledriveManager";
import { SingletonAppDataSource } from "./api/Infrastructure/mongodb/datasource";
import { GridFsManager } from "./api/Infrastructure/mongodb/gridFsManager";
import { RabbitMqController } from "./api/Infrastructure/rabbitmq/rabbitMQcontroller";
const port = "3001";


app.listen(port, async () => {
  const dataSource = SingletonAppDataSource.getInstance();
  await dataSource.intiazilateAppDataSource();
  const gridManager = GridFsManager.getInstance();
  await gridManager.initializeMongoDB();
  const rabbitController = RabbitMqController.getInstance()
  await rabbitController.initializateRabbitMQ();
  const googleDrive = GoogleDriveManager.getInstance();
  await googleDrive.initializeGoogleDriveManager();
  console.log(`Uploader service is running on port ${port}.`);
});
