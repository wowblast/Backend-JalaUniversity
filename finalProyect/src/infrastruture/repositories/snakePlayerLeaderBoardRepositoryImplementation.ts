import SnakePlayerEntity from '../../applicationCore/entities/snakePlayerEntity';
import SnakePlayerLeaderBoardEntity from '../../applicationCore/entities/snakePlayerLeaderboardEntity';
import { Repository } from 'typeorm';
import { SnakePlayerLeaderBoardRepository } from '../../applicationCore/coreIrepositories/snakePlayerLeaderBoardRepository';
import { AppDataSource } from '../data-source';
import SnakePlayerLeaderBoard from '../entities/snakePlayerLeaderBoard';
import SnakePlayerLeaderBoardMapper from '../mappers/snakePlayerLeaderBoardMapper';
export default class SnakePlayerLeaderBoardRepositoryImplementation implements SnakePlayerLeaderBoardRepository {

    private repository: Repository<SnakePlayerLeaderBoard>

    constructor() {
        this.repository = AppDataSource.getRepository(SnakePlayerLeaderBoard)

    }
    setRepository(repository: Repository<SnakePlayerLeaderBoard>) {
        this.repository = repository
    }

    async InsertSnakePlayerOnLeaderBoard(snakePlayer: SnakePlayerEntity): Promise<void> {
        const snakePlayerLeaderBoard: SnakePlayerLeaderBoard = new SnakePlayerLeaderBoard()
        snakePlayerLeaderBoard.name = snakePlayer.getName()
        snakePlayerLeaderBoard.playerId = snakePlayer.getPLayerId()
        snakePlayerLeaderBoard.score = snakePlayer.getScore()
        await this.repository.save(snakePlayerLeaderBoard)

    }
    async RemoveSnakePlayerFromLeaderBoard(snakePlayerLeaderBoardEntity: SnakePlayerLeaderBoardEntity): Promise<void>  {
        await this.repository.delete({id: snakePlayerLeaderBoardEntity.getId()})

    }
    async GetSnakePlayerLeaderBoard(): Promise<SnakePlayerLeaderBoardEntity[]> {
        const results = await this.repository.find()
        return results.map(SnakePlayerLeaderBoardMapper.castToDomainEntitiy)
    }
}
