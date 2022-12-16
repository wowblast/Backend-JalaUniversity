import {Container} from 'inversify'
import { IBoardPositionRepository } from "../coreIrepositories/boardPositionRepository";
import { BoardPositionReposioryID, GameRepositoryID, SnakePlayerRepositoryID } from '../types.ts/inversifyTypes';
import BoardPositionRepository from "../../infrastruture/repositories/boardPositionRepository";
import { ISnakePlayerRepository } from '../coreIrepositories/snakePlayeRepository';
import SnakePlayerRepository from '../../infrastruture/repositories/snakePlayerRepository';
import GameRepository from '../coreIrepositories/gameRepository';
import GameRepositoryImplementation from '../../infrastruture/repositories/gameRepositoryImplementation';

const container = new  Container();
container.bind<IBoardPositionRepository>(BoardPositionReposioryID).to(BoardPositionRepository)
container.bind<ISnakePlayerRepository>(SnakePlayerRepositoryID).to(SnakePlayerRepository) 
container.bind<GameRepository>(GameRepositoryID).to(GameRepositoryImplementation)
export { container }