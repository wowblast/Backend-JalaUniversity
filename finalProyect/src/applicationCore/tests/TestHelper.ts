import { DataSource, DataSourceOptions } from 'typeorm';

import BoardPosition from '../../infrastruture/entities/gameBoardPosition';
import SnakePlayer from '../../infrastruture/entities/snakePlayer';
import Game from '../../infrastruture/entities/game';
import SnakePlayerLeaderBoard from '../../infrastruture/entities/snakePlayerLeaderBoard';
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
  async setupTestDB (): Promise<void> {

    const dataSource = {
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'testgame',
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
  }
}
