import 'reflect-metadata';
import { container } from '../../applicationCore/config/inversify.config';
import SnakePlayerService from '../../applicationCore/coreServices/snakePlayerServiceImplementation';
import SnakePlayerEntity from '../../applicationCore/entities/snakePlayerEntity';

const snakePlayerService = container.resolve<SnakePlayerService>(SnakePlayerService);

export const createSnakePlayer = async (req, res): Promise<void> => {
  try {
    const snakePlayer: SnakePlayerEntity = await snakePlayerService.CreateSnakePlayer(req.body.id, req.body.name, req.body.snakeDirection);
    // snakePlayerService.UpdateSnakePlayerDirecction
    res.json(snakePlayer);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateSnakePlayerDirecction = async (req, res): Promise<void> => {
  try {
    const snakePlayer: SnakePlayerEntity = await snakePlayerService.UpdateSnakePlayerDirecction(req.body.id, req.body.snakeDirection);
    res.json({ updated: snakePlayer.getSnakeDirection() ===req.body.snakeDirection });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateSnakePlayerName = async (req, res): Promise<void> => {
  try {
    await snakePlayerService.UpdateSnakePlayerName(req.body.id, req.body.name);
    res.json({ updated: req.body.snakeDirection });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const moveSnakeForwards = async (req, res): Promise<void> => {
  try {
    const requestBody = req.body;
    await snakePlayerService.MoveSnakeForward(requestBody.id, requestBody.snakeDirection);
    res.json({ moved: 'true' });
  } catch (err) {
    res.status(500).send(err);
  }
};
