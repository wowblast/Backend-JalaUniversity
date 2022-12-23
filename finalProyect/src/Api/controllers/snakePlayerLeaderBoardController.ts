import { container } from '../../applicationCore/config/inversify.config';
import SnakePlayerLeaderBoardServiceImplementation from '../../applicationCore/coreServices/snakePlayerLeaderBoardServiceImplementation';
import SnakePlayerLeaderBoardEntity from '../../applicationCore/entities/snakePlayerLeaderboardEntity';

const snakePlayerLeaderBoardService = container.resolve<SnakePlayerLeaderBoardServiceImplementation>(SnakePlayerLeaderBoardServiceImplementation);

export const getSnakeLeaderBoard = async (req, res): Promise<void> => {
  try {
    const allScores: SnakePlayerLeaderBoardEntity[] = await snakePlayerLeaderBoardService.GetSnakePlayerLeaderBoard();
    res.json(allScores);
  } catch (err) {
    res.status(500).send(err);
  }
};
