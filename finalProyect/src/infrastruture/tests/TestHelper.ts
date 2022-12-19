import { DataSource, DataSourceOptions } from "typeorm";

import Database from "better-sqlite3";
import BoardPosition from '../entities/gameBoardPosition';
import SnakePlayer from '../entities/snakePlayer';
import Game from '../entities/game';
export class TestHelper {
  private static _instance: TestHelper;

  private constructor() {}

  public static get instance(): TestHelper {
    if (!this._instance) this._instance = new TestHelper();

    return this._instance;
  }

  private dbConnect!: DataSource;
  private testdb!: any;
  async setupTestDB() {
    this.testdb = new Database(":memory:", { verbose: console.log });

    this.dbConnect = new DataSource({
      name: "default",
      type: "better-sqlite3",
      database: ":memory:",
      entities: [BoardPosition, SnakePlayer, Game],
      synchronize: true,
    } as DataSourceOptions);
    await this.dbConnect.initialize()
  }

  getDatasource(): DataSource {
    return this.dbConnect
  }

  teardownTestDB() {
    this.dbConnect.destroy();
    this.testdb.close();
  }
}