import * as dotenv from "dotenv";
dotenv.config();
export const config = {
  downloaderUrl: process.env.DOWNLOADER_URL,
  accountReportUri: process.env.ACCOUNT_REPORT_URI,
  fileReportUri: process.env.FILE_REPORT_URI,
  statisticsChannel: process.env.STATISTICS_CHANNEL,
  rabbitMqUrl: process.env.RABBITMQ_URL,
  influxDbUrl: process.env.INFLUXDB_URL,
  influxDbToken: process.env.INFLUXDB_TOKEN,
  influxDbOrg: process.env.INFLUXDB_ORG,
  influxDbBucket: process.env.INFLUXDB_BUCKET,
  location: process.env.LOCATION,
  influxDbId: process.env.INFLUXDB_ID,
  actionTypes: {
    downloadFile: "download file",
    getFileReport: "get file report",
    getAccountReport: "get account report",
    createAccountInfo: "create account info",
    createFileData: "creaate file",
    deleteFile: "delete file",
    deleteAccount: "delete account",
    createFileReport: "create file report",
    createAccountReport: "create account report",
  },
  httpBasicResponses: {
    getAccounts: "Accounts Found",
    accountReportCreated: "Account report created",
    accountReportFound: 'Account reports Found',
    accountReportNotFound: 'Account reports no found',
    fileLinksFound: 'File download links found',
    fileLinksNotFound: 'File download links not found',
    filesFound:'File Found',
    fileReportCreated: 'File report created',
    fileReportFound: 'File reports found',
    fileReportNotFound: 'File report not found'   
  },

  dataBaseConfig: {
    databaseType: process.env.DATABASE_TYPE,
    host: process.env.HOST,
    dataBaseName: process.env.DATABASE_NAME,
    port: process.env.PORT,
    userName: process.env.USERNAMEDB,
    password: process.env.PASSWORD
  },
};
