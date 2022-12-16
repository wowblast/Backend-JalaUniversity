import {Container} from 'inversify'
import { IBoardPositionRepository } from "../coreIrepositories/boardPositionRepository";
import { BoardPositionReposioryID, BoardPositionServiceID, GameRepositoryID, SnakePlayerRepositoryID } from '../types.ts/inversifyTypes';
import BoardPositionRepository from "../../infrastruture/repositories/boardPositionRepository";
import { ISnakePlayerRepository } from '../coreIrepositories/snakePlayeRepository';
import SnakePlayerRepository from '../../infrastruture/repositories/snakePlayerRepository';
import GameRepository from '../coreIrepositories/gameRepository';
import GameRepositoryImplementation from '../../infrastruture/repositories/gameRepositoryImplementation';
import { IBoardPositionService } from '../coreInterfaces/IBoardPositionService';
import BoardPositionService from '../coreServices/boardPositionService';

const container = new  Container();
container.bind<IBoardPositionRepository>(BoardPositionReposioryID).to(BoardPositionRepository)
container.bind<ISnakePlayerRepository>(SnakePlayerRepositoryID).to(SnakePlayerRepository) 
container.bind<GameRepository>(GameRepositoryID).to(GameRepositoryImplementation)
container.bind<IBoardPositionService>(BoardPositionServiceID).to(BoardPositionService)
container.bind<IBoardPositionRepository>("dd").to(BoardPositionRepository)

export { container }