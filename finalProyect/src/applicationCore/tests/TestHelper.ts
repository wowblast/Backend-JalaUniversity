import { DataSource, DataSourceOptions } from 'typeorm'

import Database from 'better-sqlite3'
import BoardPosition from '../../infrastruture/entities/gameBoardPosition'
import SnakePlayer from '../../infrastruture/entities/snakePlayer'
import Game from '../../infrastruture/entities/game'
import SnakePlayerLeaderBoard from '../../infrastruture/entities/snakePlayerLeaderBoard'
export class TestHelper {
  private static _instance: TestHelper

  private constructor () {}

  public static get instance (): TestHelper {
    if (this._instance === undefined) {
      this._instance = new TestHelper()
    }

    return this._instance
  }

  private dbConnect!: DataSource
  private testdb!: any
  async setupTestDB (): Promise<void> {
    this.testdb = new Database(':memory:', { verbose: console.log })

    const dataSource = {
      name: 'default',
      type: 'better-sqlite3',
      database: ':memory:',
      entities: [BoardPosition, SnakePlayer, Game, SnakePlayerLeaderBoard],
      synchronize: true
    }

    this.dbConnect = new DataSource(dataSource as DataSourceOptions)
    await this.dbConnect.initialize()
  }

  getDatasource (): DataSource {
    return this.dbConnect
  }

  async teardownTestDB (): Promise<void> {
    await this.dbConnect.destroy()
    this.testdb.close()
  }
}
