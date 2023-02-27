import * as dotenv from "dotenv";
dotenv.config();
export const config = {
  downloaderUrl: process.env.DOWNLOADER_URL,
  accountReportUri: process.env.ACCOUNT_REPORT_URI,
  statisticsChannel: process.env.STATISTICS_CHANNEL,
  rabbitMqUrl: process.env.RABBITMQ_URL,
  influxDbUrl: process.env.INFLUXDB_URL,
  influxDbToken: process.env.INFLUXDB_TOKEN,
  influxDbOrg: process.env.INFLUXDB_ORG,
  influxDbBucket: process.env.INFLUXDB_BUCKET,
  location: process.env.LOCATION,
  influxDbId: process.env.INFLUXDB_ID,
  dataBaseConfig: {
    databaseType: process.env.DATABASE_TYPE,
    host: process.env.HOST,
    dataBaseName: process.env.DATABASE_NAME,
    post: process.env.PORT,
  },
  actionTypes: {
    createAccount: "create account",
    createFileData: "creaate file",
    deleteFile: "delete file",
    deleteAccount: "delete account",
  },
  googleDriveActionTypes: {
    createAccount: "create Account",
    createFile: "create File",
    deleteAccount: "delete Account",
    deleteFile: "delete File",
    updateFile: "update File",
  },
  httpBasicResponses: {
    createAccount: "Account created",
    createFile: "File created",
    deleteAccount: "Account deleted",
    deleteFile: "File deleted",
    updateFile: "File updated",
    updateAccount: "Account updated",
    accountNotFound: "Account not found",
    accountFound:'Account found',
    fileNotFound: "File not found",
    accountExist: "Account exist",
    fileExits: "FileExists",
    fileUploaded: "File Uploaded",
    fileDataResult: "File data found",
    fileDeleteInProgress: "File deletion in progress",
    fileUpdateInProgress: "File name update in progress if exist",
  },
  fileStatus: {
    replicatingState: "replicating",
    readyState: "ready",
  },
  tempFolderDir: "./src/api/Infrastructure/mongodb/outtest/",
  rabbiMqMessages: {
    createFile: "create",
    updateFile: "update file",
    deleteAccount: "delete account",
    deleteFile: "delete",
  },
  gridFsConfig: {
    mongoUri: process.env.MONGO_URI,
    mongoDataBaseName: process.env.MONGO_DATABASE_NAME,
    mongoBucketName: process.env.MONGO_BUCKET_NAME,
    mongoStorageUrl: process.env.MONGO_STORAGE_URL,
  },
};
