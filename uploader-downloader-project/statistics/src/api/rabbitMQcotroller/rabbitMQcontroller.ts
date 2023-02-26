import client, { Channel, Connection, ConsumeMessage } from "amqplib";
import { AccountReport } from "../services/entities/accountReport";
import { HttpController } from "../httpRequest/httpController";
import { FileReport } from "../services/entities/fileReport";
import { MessageData } from "../services/interfaces/messageData";
import { config } from '../../../config';
import logger from 'jet-logger';
import { InfluxDbController } from '../influxDBController/influxDBcontroller';

export class RabbitMqController {
  private static _instance: RabbitMqController = new RabbitMqController();

  private connection: Connection;
  private channel: Channel;
  private statisticsChannel: string = config.statisticsChannel;
  private consumer;
  private isMessagesManagerReady: boolean = true;
  private messages: Array<string> = new Array();
  constructor() {
    if (RabbitMqController._instance) {
      throw new Error(
        "Error: Instantiation failed: Use RabbitMqController.getInstance() instead of new."
      );
    }
    RabbitMqController._instance = this;
  }

  public async initializateRabbitMQ() {

    if (!this.connection) {
      this.connection = await client.connect(
        config.rabbitMqUrl
      );
      this.consumer =
        (channel: Channel) =>
        async (msg: ConsumeMessage | null): Promise<void> => {
          if (msg) {
            console.log("message ",msg.content.toString())
            this.messages.push(msg.content.toString());
            await this.manageMessages();
            channel.ack(msg);
          }
        };
        InfluxDbController.getInstance().initInfluxDB()

      await this.initializateChannel();
      await this.createChannel(this.statisticsChannel);
      await this.startToReceiveMessages();
      logger.info("init")

    }
  }

  async initializateChannel() {
    this.channel = await this.connection.createChannel();
  }

  async createChannel(channelName: string) {
    await this.channel.assertQueue(channelName);
  }

  public async startToReceiveMessages() {
    this.channel.consume(this.statisticsChannel, this.consumer(this.channel));
  }

  public static getInstance(): RabbitMqController {
    return RabbitMqController._instance;
  }

  public async manageMessages() {
    if (this.isMessagesManagerReady) {
      this.isMessagesManagerReady = false;
      while (true) {
        let currentMesages = this.messages;
        console.log("messages remainign", currentMesages);
        const message: MessageData = JSON.parse(currentMesages[0]);
        switch (message.method) {
          case "create report":
            await this.createReports(message);
            break;
          default:
            break;
        }
        this.messages.shift();
        console.log(this.messages);
        if (this.messages.length == 0) {
          break;
        }
      }
      this.isMessagesManagerReady = true;
    }
  }

  async createReports(message: MessageData) {
    const newData = new Date();
    const accountReport = new AccountReport();
    const fileReport = new FileReport();
    const todayDate = newData.getFullYear() +
    "-" +
    (newData.getMonth() + 1) +
    "-" +
    newData.getDate();
    accountReport.downloadedAmountInBytes = message.sizeFile;
    accountReport.downloadedFilesAmount = 1;
    accountReport.email = message.email;
    accountReport.dateReport = todayDate;
    fileReport.downloadedAmountInBytes = message.sizeFile;
    fileReport.downloadedFilesAmount = 1;
    fileReport.fileName = message.fileName;
    fileReport.dateReport = todayDate;
    fileReport.email = message.email;

    await this.createAccountReport(accountReport);
    await this.createFileReport(fileReport);
  }

  async createAccountReport(accountReport: AccountReport) {
    await InfluxDbController.getInstance().saveActionStatus(config.actionTypes.createReport)
    const httpController = new HttpController();
    await httpController.sendPostToAccountReport(accountReport);
  }

  async createFileReport(fileReport: FileReport) {
    await InfluxDbController.getInstance().saveActionStatus(config.actionTypes.createReport)
    const httpController = new HttpController();
    await httpController.sendPostToFileReport(fileReport);
  }
}
