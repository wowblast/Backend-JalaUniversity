import { GridFsManager } from "../../Infrastructure/mongodb/gridFsManager";
import { RabbitMqController } from "../../Infrastructure/rabbitmq/rabbitMQcontroller";
import { statusTypes } from "../../types/statusTypes";
import { File } from "../entities/file";

export class FileService {
  async uploadFile(filename: string) {
    const gridFsManager = GridFsManager.getInstance();
    console.log("filename ", filename);
    await gridFsManager.updateFileStatus(filename, statusTypes.pending);
  }

  async getFile(filename: string): Promise<File> {
    const gridFsManager = GridFsManager.getInstance();
    return await gridFsManager.getFile(filename)
  }

  async sendMessage() {
    await RabbitMqController.getInstance().sendMessage("hola 1");
    await RabbitMqController.getInstance().sendMessage("hola 2");
  }
}
