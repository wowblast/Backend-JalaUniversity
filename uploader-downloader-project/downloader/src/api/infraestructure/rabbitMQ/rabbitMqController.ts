import client, { Channel, Connection, ConsumeMessage } from "amqplib";
import { GoogleDriveFile } from '../../services/entities/googleDriveFile';
import { GoogleDriveRepositoryImplementation } from '../postresql/googleDriveFileRepositoryImplementation';
import { AccountService } from '../../services/coreServices/accountService';
import { Account } from '../../services/entities/account';

export class RabbitMqController {
  private static _instance: RabbitMqController = new RabbitMqController();

  private connection: Connection;
  private channel: Channel;
  private downloadChannel: string = "downloadChannel";

  private consumer;
  private isMessagesManagerReady = true;
  private myconsumer;
  private messages: Array<string> = new Array();

  constructor() {
    if (RabbitMqController._instance) {
      throw new Error(
        "Error: Instantiation failed: Use RabbitMqController.getInstance() instead of new."
      );
    }
    //this.initializateRabbitMQ()
    RabbitMqController._instance = this;
  }

  public async initializateRabbitMQ() {
    if (!this.connection) {
      this.connection = await client.connect(
        "amqp://guest:guest@localhost:5672"
      );
      this.consumer =
        (channel: Channel) =>
        async (msg: ConsumeMessage | null): Promise<void> => {
          if (msg) {
            console.log("downloadchannel", msg.content.toString());
            this.messages.push(msg.content.toString())
            this.manageMessages()
            channel.ack(msg);
          }
        };
      console.log("init");
      this.isMessagesManagerReady = true;
      await this.initializateChannel();
      await this.createChannel(this.downloadChannel);
      await this.startToReceiveMessages();
    }
  }

  async initializateChannel() {
    this.channel = await this.connection.createChannel();
  }

  async createChannel(channelName: string) {
    await this.channel.assertQueue(channelName);
  }

  public async sendMessage(message: string) {
    console.log("mesage sent: ", message);

    this.channel.sendToQueue(this.downloadChannel, Buffer.from(message));
  }

  public async startToReceiveMessages() {
    this.myconsumer = await this.channel.consume(
      this.downloadChannel,
      this.consumer(this.channel)
    );
  }

  public async manageMessages() {
    //const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    if (this.isMessagesManagerReady) {
      this.isMessagesManagerReady = false;
      while (true) {
        //await sleep(5000);
        let currentMesages = this.messages;
        //console.log("done ", currentMesages[0]);
        console.log("messages remainign", currentMesages)
        const message = JSON.parse(currentMesages[0])
        switch (message.method) {
            case 'create':
                await this.createGoogleDrive(message.file as GoogleDriveFile)
                await this.createAccount(message.file.email)
                break;
            case 'delete':
                await this.deleteGoogleDriveFile(message.file as GoogleDriveFile)
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
  
  async deleteGoogleDriveFile(file: GoogleDriveFile) {
    const googleDriveRepositoryImplementation: GoogleDriveRepositoryImplementation = new GoogleDriveRepositoryImplementation();
    await googleDriveRepositoryImplementation.deleteFile(file.fileName);

  }

  async createGoogleDrive(file: GoogleDriveFile) {
    const googleDriveRepositoryImplementation: GoogleDriveRepositoryImplementation = new GoogleDriveRepositoryImplementation();
    await googleDriveRepositoryImplementation.insertFile(file);
  }

  async createAccount(email: string) {
    const accountService  = new AccountService()
    const newAccount = new Account()
    newAccount.email = email;
    newAccount.downloadedData = 0;
    await accountService.insertAccountIfNewAccount(newAccount)
  }

  public static getInstance(): RabbitMqController {
    return RabbitMqController._instance;
  }
}
