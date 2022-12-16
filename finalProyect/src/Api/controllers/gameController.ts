import { container } from "../../applicationCore/config/inversify.config"
import GameService from '../../applicationCore/coreServices/gameService';

const gameService = container.resolve<GameService>(GameService)

export const  createGame = async  (req, res) => {
    console.log("controller")
		try {			
            await gameService.CreateGame(req.body.boardSize, req.body.interval )
			res.json({"game": "created"})
		}
		catch (err) {
		res.status(500).send(err)
		}
	}