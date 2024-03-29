import { GoogleDriveRepositoryImplementation } from "../../infraestructure/postresql/googleDriveFileRepositoryImplementation";
import { AccountRepositoryImplementation } from "../../infraestructure/postresql/accountRepositoryImplementation";
import { GoogleDriveFile } from "../entities/googleDriveFile";
import { Account } from "../entities/account";
import { FileData } from "../entities/fileData";
import { FileDataService } from "./fileDataService";
import { RabbitMqController } from "../../infraestructure/rabbitMQ/rabbitMQcontroller";
export class GoogleDriveFileService {
  async getFileByFileName(fileName: string) {
    const googleDriveRepositoryImplementation: GoogleDriveRepositoryImplementation =
      new GoogleDriveRepositoryImplementation();
    const accountRepositoryImplementation: AccountRepositoryImplementation =
      new AccountRepositoryImplementation();
    const fileDataService: FileDataService = new FileDataService();
    const leastUsedAccounts: Account[] =
      await accountRepositoryImplementation.getLeastUsedAccounts();
    const averageDownloads = await accountRepositoryImplementation.getTimesDownloadedAverage();
    let leastUsedAccount: Account;
    for (let index = 0; index < leastUsedAccounts.length; index++) {
      if(leastUsedAccounts[index].timesDownloaded <= averageDownloads) {
        leastUsedAccount = leastUsedAccounts[index];
        break;
      }
    }
    const file: GoogleDriveFile =
      await googleDriveRepositoryImplementation.getFileByEmailAndFileName(
        leastUsedAccount.email,
        fileName
      );
    if(!file) {
      throw new Error('file not found')
    }
    const fileData: FileData = await fileDataService.getFileData(file.fileName);
    await this.updateAccountUsage(leastUsedAccount, file);
    await this.updateFileDownloadAmount(fileData, file);
    const message = this.createMQmessage(file);
    await RabbitMqController.getInstance().sendMessage(JSON.stringify(message));
    return {
      webViewLink: file?.webViewLink,
      directDownloadLink: file?.directDownloadLink,
    };
  }

  async getAllFiles() {
    const googleDriveRepositoryImplementation: GoogleDriveRepositoryImplementation =
      new GoogleDriveRepositoryImplementation();
    const files = await googleDriveRepositoryImplementation.getFiles();
    const fileNames = [...new Set(files.map((item) => item.fileName))];
    return fileNames;
  }

  async updateAccountUsage(leastUsedAccount: Account, file: GoogleDriveFile) {
    leastUsedAccount.downloadedData += file.fileSize;
    leastUsedAccount.timesDownloaded += 1;
    const accountRepositoryImplementation: AccountRepositoryImplementation =
      new AccountRepositoryImplementation();
    await accountRepositoryImplementation.updateAccount(leastUsedAccount);
  }

  async updateFileDownloadAmount(fileData: FileData, file: GoogleDriveFile) {
    fileData.downloadedData += file.fileSize;
    const fileDataService: FileDataService = new FileDataService();
    await fileDataService.updateFileData(fileData);
  }

  createMQmessage(file: GoogleDriveFile) {
    const message = {
      method: "create report",
      email: file.email,
      fileName: file.fileName,
      sizeFile: file.fileSize,
    };
    return message;
  }
}
