import { Container } from "inversify";
import { BoardPositionRepository } from "../coreIrepositories/boardPositionRepository";
import {
  BoardPositionReposioryID,
  BoardPositionServiceID,
  GameRepositoryID,
  SnakeFoodServiceIdentifier,
  SnakePlayerLeaderBoardServiceIdentifier,
  SnakePlayerLeaderBoarRepositoryIdentifier,
  SnakePlayerRepositoryID,
  SnakePlayerServiceIdentifier,
} from "../types.ts/inversifyTypes";
import BoardPositionRepositoryImplementation from "../../infrastruture/repositories/boardPositionRepository";
import { SnakePlayerRepository } from "../coreIrepositories/snakePlayeRepository";
import SnakePlayerRepositoryImplementation from "../../infrastruture/repositories/snakePlayerRepositoryImplementation";
import GameRepository from "../coreIrepositories/gameRepository";
import GameRepositoryImplementation from "../../infrastruture/repositories/gameRepositoryImplementation";
import { BoardPositionService } from "../coreInterfaces/BoardPositionService";
import BoardPositionServiceImplementation from "../coreServices/boardPositionServiceImplementation";
import { InitializateDatabaseConection } from "../../infrastruture/dataBaseController";
import { SnakeFoodService } from "../coreInterfaces/SnakeFoodService";
import SnakeFoodServiceImplementation from "../coreServices/snakeFoodServiceImplementation";
import { SnakePlayerService } from "../coreInterfaces/SnakePlayerService";
import SnakePlayerServiceImplementation from "../coreServices/snakePlayerServiceImplementation";
import { SnakePlayerLeaderBoardRepository } from "../coreIrepositories/snakePlayerLeaderBoardRepository";
import SnakePlayerLeaderBoardRepositoryImplementation from "../../infrastruture/repositories/snakePlayerLeaderBoardRepositoryImplementation";
import { SnakePlayerLeaderBoardService } from "../coreInterfaces/SnakePlayerLeaderboard";
import SnakePlayerLeaderBoardServiceImplementation from "../coreServices/snakePlayerLeaderBoardServiceImplementation";

const container = new Container();
container
  .bind<BoardPositionRepository>(BoardPositionReposioryID)
  .to(BoardPositionRepositoryImplementation);
container
  .bind<SnakePlayerRepository>(SnakePlayerRepositoryID)
  .to(SnakePlayerRepositoryImplementation);
container
  .bind<GameRepository>(GameRepositoryID)
  .to(GameRepositoryImplementation);
container
  .bind<SnakePlayerLeaderBoardRepository>(
    SnakePlayerLeaderBoarRepositoryIdentifier
  )
  .to(SnakePlayerLeaderBoardRepositoryImplementation);
container
  .bind<BoardPositionService>(BoardPositionServiceID)
  .to(BoardPositionServiceImplementation);
container
  .bind<SnakeFoodService>(SnakeFoodServiceIdentifier)
  .to(SnakeFoodServiceImplementation);
container
  .bind<SnakePlayerService>(SnakePlayerServiceIdentifier)
  .to(SnakePlayerServiceImplementation);
container
  .bind<SnakePlayerLeaderBoardService>(SnakePlayerLeaderBoardServiceIdentifier)
  .to(SnakePlayerLeaderBoardServiceImplementation);

InitializateDatabaseConection();

export { container };
