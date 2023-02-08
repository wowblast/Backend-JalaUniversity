
import { uploadFileMiddleware} from '../filesUploadsManagement/upload'
import { RabbitMqController } from '../rabbitmq/rabbitMQcontroller'
export const uploadFile = async (req, res): Promise<void> => {
  console.log("uoload")
  try {
    console.log("file", req.file)
    await uploadFileMiddleware(req, res);
    //await RabbitMqController.getInstance().sendMessage('hola 1')
    //await RabbitMqController.getInstance().sendMessage('hola 2')

    //RabbitMqController.getInstance().receiveMessages()
    res.json({uploadFile: 'pending', status: 'ok'});
  } catch (err) {
    res.status(500).send(err);
  }
};

