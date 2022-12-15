import {Container} from 'inversify'
import { IBoardPositionRepository } from "../coreIrepositories/boardPositionRepository";
import { BoardPositionReposioryID, SnakePlayerRepositoryID, SnakePositionRepositoryID } from '../types.ts/inversifyTypes';
import BoardPositionRepository from "../../infrastruture/repositories/boardPositionRepository";
import { ISnakePlayerRepository } from '../coreIrepositories/snakePlayeRepository';
import SnakePlayerRepository from '../../infrastruture/repositories/snakePlayerRepository';
import { ISnakePositionRepository } from '../coreIrepositories/snakePositionRepository';
import SnakePositionRepository from '../../infrastruture/repositories/snakePositionRepository';

const container = new  Container();
container.bind<IBoardPositionRepository>(BoardPositionReposioryID).to(BoardPositionRepository)
container.bind<ISnakePlayerRepository>(SnakePlayerRepositoryID).to(SnakePlayerRepository)
container.bind<ISnakePositionRepository>(SnakePositionRepositoryID).to(SnakePositionRepository)

export { container }