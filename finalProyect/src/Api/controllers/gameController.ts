import { container } from '../../applicationCore/config/inversify.config'
import GameService from '../../applicationCore/coreServices/gameServiceImplementation'

const gameService = container.resolve<GameService>(GameService)

export const createGame = async (req, res): Promise<void> => {
  try {
    await gameService.CreateGame(req.body.boardSize, req.body.interval)
    res.json({ game: 'created' })
  } catch (err) {
    res.status(500).send(err)
  }
}

export const startGameAuto = async (req, res): Promise<void> => {
  try {
    await gameService.StartAutoMovemenvent()
    res.json({ game: 'started' })
  } catch (err) {
    res.status(500).send(err)
  }
}

export const stopGameAuto = async (req, res): Promise<void> => {
  try {
    await gameService.StopAutoMovemenvent()
    res.json({ game: 'stopped' })
  } catch (err) {
    res.status(500).send(err)
  }
}
