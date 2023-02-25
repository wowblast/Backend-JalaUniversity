import { InfluxDB, Point } from "@influxdata/influxdb-client";
import { config } from "../../../config";

export class InfluxDbController {
  private static instance: InfluxDbController;
  private influxConnection;

  private constructor() {}

  public initInfluxDB() {
    this.influxConnection = new InfluxDB({
      url: config.influxDbUrl,
      token: config.influxDbToken,
    }).getWriteApi(config.influxDbOrg, config.influxDbBucket, "ns");
    this.influxConnection.useDefaultTags({ location: config.location });
    console.log("infludb conected");
  }

  public async saveActionStatus(actionValue: string) {
    const newPoint: Point = new Point(config.influxDbId);
    newPoint.tag("actions", actionValue);
    newPoint.intField("day", new Date().getDay());
    newPoint.timestamp(new Date());
    this.influxConnection.writePoint(newPoint);
    await this.influxConnection.flush();
  }

  public static getInstance(): InfluxDbController {
    if (!InfluxDbController.instance) {
      InfluxDbController.instance = new InfluxDbController();
    }

    return InfluxDbController.instance;
  }
}
