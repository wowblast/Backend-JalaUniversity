import {Container} from 'inversify'
import { IBoardPositionRepository } from "../coreIrepositories/boardPositionRepository";
import { BoardPositionReposioryID } from '../types.ts/inversifyTypes';
import BoardPositionRepository from "../../infrastruture/repositories/boardPositionRepository";

const container = new  Container();
container.bind<IBoardPositionRepository>(BoardPositionReposioryID).to(BoardPositionRepository)
export { container}