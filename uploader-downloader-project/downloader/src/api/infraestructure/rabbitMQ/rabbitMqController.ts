import client, { Channel, Connection, ConsumeMessage } from "amqplib";
import { GoogleDriveFile } from "../../services/entities/googleDriveFile";
import { GoogleDriveRepositoryImplementation } from "../postresql/googleDriveFileRepositoryImplementation";
import { AccountService } from "../../services/coreServices/accountService";
import { Account } from "../../services/entities/account";
import { FileDataService } from "../../services/coreServices/fileDataService";
import { FileData } from "../../services/entities/fileData";
import { MessageData } from "../../services/interfaces/messageData";
import { InfluxDbController } from "../../influxDBController/influxDBcontroller";
import { config } from "../../../../config";
import { FileDataRepositoryImplementation } from "../postresql/fileDataRepositoryImplementation";
import { FileReportRepositoryImplementation } from "../postresql/fileReportRepositoryImplementation";
import { FileReportEntity } from "../postresql/entities/fileReportEntity";
import { FileReport } from "../../services/entities/fileReport";
import { AccountReportRepositoryImplementation } from '../postresql/accountReportRepositoryImplementation';
import { AccountRepositoryImplementation } from '../postresql/accountRepositoryImplementation';

export class RabbitMqController {
  private static _instance: RabbitMqController = new RabbitMqController();

  private connection: Connection;
  channel: Channel;
  private downloadChannel: string = "downloadChannel";
  private statisticsChannel: string = "statisticsChannel";

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
            this.messages.push(msg.content.toString());
            this.manageMessages();
            channel.ack(msg);
          }
        };
      this.isMessagesManagerReady = true;
      await this.initializateChannel();
      await this.createChannel(this.downloadChannel);
      await this.createChannel(this.statisticsChannel);
      await this.startToReceiveMessages();
      console.log("init");
    }
  }

  async initializateChannel() {
    this.channel = await this.connection.createChannel();
  }

  async createChannel(channelName: string) {
    await this.channel.assertQueue(channelName);
  }

  public async sendMessage(message: string) {
    console.log("sent message tpe ", typeof message, message);

    try {
      this.channel.sendToQueue(this.statisticsChannel, Buffer.from(message));
    } catch (error) {
      console.log(error);
    }
  }

  public async startToReceiveMessages() {
    this.myconsumer = await this.channel.consume(
      this.downloadChannel,
      this.consumer(this.channel)
    );
  }

  public async manageMessages() {
    if (this.isMessagesManagerReady) {
      InfluxDbController.getInstance().initInfluxDB();
      this.isMessagesManagerReady = false;
      while (true) {
        let currentMesages = this.messages;
        console.log("messages remainign", currentMesages);
        const message: MessageData = JSON.parse(currentMesages[0]);
        switch (message.method) {
          case "create":
            await this.createGoogleDrive(message.file as GoogleDriveFile);
            await this.createAccount(message.file.email);
            await this.createFileData(message.file.fileName);
            await InfluxDbController.getInstance().saveActionStatus(
              config.actionTypes.createAccountInfo
            );
            await InfluxDbController.getInstance().saveActionStatus(
              config.actionTypes.createFileData
            );
            break;
          case "delete":
            await this.deleteFileNameFromReports(message.file.fileName);
            await this.deleteGoogleDriveFile(message.file as GoogleDriveFile);
            await this.deleteFileData(message.file.fileName);
            await InfluxDbController.getInstance().saveActionStatus(
              config.actionTypes.deleteAccount
            );
            await InfluxDbController.getInstance().saveActionStatus(
              config.actionTypes.deleteFile
            );
            break;
          case "update file":
            await this.updateFileNameOnGoogleDrive(
              message.file.fileName,
              message.newFileName
            );
            await this.updateFileDataName(
              message.file.fileName,
              message.newFileName
            );
            await this.updateFileNameOnReports(
              message.file.fileName,
              message.newFileName
            );
            break;
          case "delete account":
            await this.deleteAccountFromReports(message.file.email);
            await this.deleteGoogleDriveFilesByEmail(message.file.email);
            await this.deleteAccountData(message.file.email);
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
    const googleDriveRepositoryImplementation: GoogleDriveRepositoryImplementation =
      new GoogleDriveRepositoryImplementation();
    await googleDriveRepositoryImplementation.deleteFile(file.fileName);
  }

  async deleteFileData(fileName: string) {
    const fileDataService = new FileDataService();
    await fileDataService.deleteFileData(fileName);
  }

  async getFileReportsByName(fileName: string) {
    const fileReportRepositoryImplementation: FileReportRepositoryImplementation =
      new FileReportRepositoryImplementation();
    return await fileReportRepositoryImplementation.getFileReportByFileName(
      fileName
    );
  }

  async updateFileReportOnAccount(fileReport: FileReport) {
    const accountReportRepositoryImplementation: AccountReportRepositoryImplementation =
      new AccountReportRepositoryImplementation();
    const accountReport =
      await accountReportRepositoryImplementation.getAccountReportByDateAndEmail(
        fileReport.dateReport,
        fileReport.email
      );
    accountReport.downloadedAmountInBytes -= fileReport.downloadedAmountInBytes;
    accountReport.downloadedFilesAmount -= fileReport.downloadedFilesAmount;
    if (accountReport.downloadedAmountInBytes <= 0) {
      await accountReportRepositoryImplementation.deleteAccountReport(
        accountReport.id
      );
    } else {
      await accountReportRepositoryImplementation.upateAccountReport(
        accountReport
      );
    }
  }

  async updateAccountDownloadData(fileReport: FileReport) {
    const accountRepositoryImplementation: AccountRepositoryImplementation =
      new AccountRepositoryImplementation();
    const accountFound = await accountRepositoryImplementation.getAccount(
      fileReport.email
    );
    accountFound.downloadedData -= fileReport.downloadedAmountInBytes;
    await accountRepositoryImplementation.updateAccount(accountFound);
  }

  async deleteFileNameFromReports(fileName: string) {
    const reports = await this.getFileReportsByName(fileName);
    for (let index = 0; index < reports.length; index++) {
      await this.updateAccountDownloadData(reports[index]);
      await this.updateFileReportOnAccount(reports[index]);
      await this.deleteFileReport(reports[index]);
    }
  }

  async deleteGoogleDriveFilesByEmail(email: string) {
    const googleDriveRepositoryImplementation: GoogleDriveRepositoryImplementation =
      new GoogleDriveRepositoryImplementation();
    await googleDriveRepositoryImplementation.deleteFileByEmail(email);
  }

  async deleteAccountData(email: string) {
    const accountRepositoryImplementation: AccountRepositoryImplementation =
      new AccountRepositoryImplementation();
    const accountFound = await accountRepositoryImplementation.getAccount(
      email
    );
    if (accountFound)
      await accountRepositoryImplementation.deleteAccount(email);
  }

  async deleteFileReport(fileReport: FileReport) {
    const fileReportRepositoryImplementation: FileReportRepositoryImplementation =
      new FileReportRepositoryImplementation();
    await fileReportRepositoryImplementation.deleteFileReport(fileReport.id);
  }

  async deleteAccountFromReports(email: string) {
    const fileReportRepositoryImplementation: FileReportRepositoryImplementation =
      new FileReportRepositoryImplementation();
      const accountReportRepositoryImplementation: AccountReportRepositoryImplementation =
      new AccountReportRepositoryImplementation();
    const fileReports =
      await fileReportRepositoryImplementation.getFileReportByEmail(email);
    for (let index = 0; index < fileReports.length; index++) {
      await this.updateFileDownloadData(fileReports[index]);
      await this.deleteFileReport(fileReports[index]);
    }
    await accountReportRepositoryImplementation.deleteSAccountReportByEmail(email)
  }

  async updateFileDownloadData(report: FileReport) {
    const fileDataService = new FileDataService();
    const fileData = await fileDataService.getFileData(report.fileName);
    fileData.downloadedData -= report.downloadedAmountInBytes;
    await fileDataService.updateFileData(fileData)
  }

  async createGoogleDrive(file: GoogleDriveFile) {
    const googleDriveRepositoryImplementation: GoogleDriveRepositoryImplementation =
      new GoogleDriveRepositoryImplementation();
    await googleDriveRepositoryImplementation.insertFile(file);
  }

  async createAccount(email: string) {
    const accountService = new AccountService();
    const newAccount = new Account();
    newAccount.email = email;
    newAccount.downloadedData = 0;
    await accountService.insertAccountIfNewAccount(newAccount);
  }

  async createFileData(fileName: string) {
    const fileDataService = new FileDataService();
    const newFileData = new FileData();
    newFileData.downloadedData = 0;
    newFileData.fileName = fileName;
    await fileDataService.insertFileIfNewFile(newFileData);
  }

  async updateFileDataName(fileName: string, newFileName: string) {
    const fileDataRepositoryImplementation: FileDataRepositoryImplementation =
      new FileDataRepositoryImplementation();
    const fileDataFound = await fileDataRepositoryImplementation.getFileData(
      fileName
    );
    if (fileDataFound) {
      fileDataFound.fileName = newFileName;
      await fileDataRepositoryImplementation.updateFileData(fileDataFound);
    }
  }

  async updateFileNameOnReports(fileName: string, newFileName: string) {
    const fileReportRepositoryImplementation: FileReportRepositoryImplementation =
      new FileReportRepositoryImplementation();
    await fileReportRepositoryImplementation.updateFilenameOfReports(
      fileName,
      newFileName
    );
  }
  async updateFileNameOnGoogleDrive(fileName: string, newFileName: string) {
    const googleDriveRepositoryImplementation: GoogleDriveRepositoryImplementation =
      new GoogleDriveRepositoryImplementation();
    await googleDriveRepositoryImplementation.updateFile(fileName, newFileName);
  }

  public static getInstance(): RabbitMqController {
    return RabbitMqController._instance;
  }
}
