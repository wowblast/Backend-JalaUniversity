import axios from "axios";
import { AccountReport } from "../services/entities/accountReport";
import { config } from "../../../config";
import { FileReport } from '../services/entities/fileReport';
export class HttpController {
  private httpConfig;
  constructor() {
    this.httpConfig = {
      method: "post",
      maxBodyLength: Infinity,
      url: "",
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    };
  }
  async sendPostToAccountReport(accountReport: AccountReport) {
    const data = JSON.stringify({
      email: accountReport.email,
      dateReport: accountReport.dateReport,
      downloadedAmountInBytes: accountReport.downloadedAmountInBytes,
      downloadedFilesAmount: accountReport.downloadedFilesAmount,
    });
    this.httpConfig.url = config.downloaderUrl + config.accountReportUri;
    this.httpConfig.data = data;
    const response = await axios(this.httpConfig);
    console.log(response);
  }

  async sendPostToFileReport(fileReport: FileReport) {
    const data = JSON.stringify({
      fileName: fileReport.fileName,
      dateReport: fileReport.dateReport,
      downloadedAmountInBytes: fileReport.downloadedAmountInBytes,
      downloadedFilesAmount: fileReport.downloadedFilesAmount,
    });

    this.httpConfig.url = config.downloaderUrl + config.fileReportUri;
    this.httpConfig.data = data;

    const response = await axios(this.httpConfig);
    console.log(response);
  }
}
