import * as dotenv from 'dotenv' 
dotenv.config()
export const config = {
    downloaderUrl :process.env.DOWNLOADER_URL,
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
        createReport: 'create report from statistics '
    }
}

