import 'reflect-metadata'
import { container } from '../../applicationCore/config/inversify.config'
import SnakePlayerService from '../../applicationCore/coreServices/snakePlayerService';
import SnakePlayerEntity from '../../applicationCore/entities/snakePlayerEntity';



const snakePlayerService = container.resolve<SnakePlayerService>(SnakePlayerService)

export const  createSnakePlayer = async  (req, res) => {
		try {			
            const snakePlayer: SnakePlayerEntity = await snakePlayerService.CreateSnakePlayer(req.body.id, req.body.name, req.body.snakeDirection)
            snakePlayerService.UpdateSnakePlayerDirecction
			res.json(snakePlayer)
		}
		catch (err) {
		res.status(500).send(err)
		}
	}

export const updateSnakePlayerDirecction = async  (req, res) => {
    try {   
        await snakePlayerService.UpdateSnakePlayerDirecction(req.body.id, req.body.snakeDirection )
        res.json({"updated": req.body.snakeDirection})
    }
    catch (err) {
    res.status(500).send(err)
    }
}

export const updateSnakePlayerName = async  (req, res) => {
    try {   
        await snakePlayerService.UpdateSnakePlayerName(req.body.id, req.body.name )
        res.json({"updated": req.body.snakeDirection})
    }
    catch (err) {
    res.status(500).send(err)
    }
}
