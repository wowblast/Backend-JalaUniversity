import { DataSource, DataSourceOptions } from 'typeorm';

import Database from 'better-sqlite3';
import BoardPosition from '../entities/gameBoardPosition';
import SnakePlayer from '../entities/snakePlayer';
import Game from '../entities/game';
import SnakePlayerLeaderBoard from '../entities/snakePlayerLeaderBoard';
export class TestHelper {
  private static _instance: TestHelper;

  public static get instance (): TestHelper {
    if (this._instance === undefined) {
      this._instance = new TestHelper();
    }

    return this._instance;
  }

  private dbConnect!: DataSource;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private testdb!: any;
  async setupTestDB (): Promise<void> {
    this.testdb = new Database(':memory:', { verbose: console.log });

    const dataSource = {
      name: 'default',
      type: 'better-sqlite3',
      database: ':memory:',
      entities: [BoardPosition, SnakePlayer, Game, SnakePlayerLeaderBoard],
      synchronize: true
    };

    this.dbConnect = new DataSource(dataSource as DataSourceOptions);
    await this.dbConnect.initialize();
  }

  getDatasource (): DataSource {
    return this.dbConnect;
  }

  async teardownTestDB (): Promise<void> {
    await this.dbConnect.destroy();
    this.testdb.close();
  }
}
