import 'reflect-metadata'
import { container } from '../../applicationCore/config/inversify.config'
import GameBoardPositionEntity from '../../applicationCore/entities/gameBoardPositionEntity';
import BoardPositionService from '../../applicationCore/coreServices/boardPositionServiceImplementation';



const boardPositionService = container.resolve<BoardPositionService>(BoardPositionService)

export const  getBoardPositions = async  (req, res) => {
		try {			
            const allPositions: GameBoardPositionEntity[] = await boardPositionService.GetAllPositions()
			res.json(allPositions)
		}
		catch (err) {
		res.status(500).send(err)
		}
	}

export const createBoard = async  (req, res) => {
    try {        
        const newBoard: GameBoardPositionEntity[] = await boardPositionService.CreateBoard(req.body.boardSize)   
        res.json({newBoard})
    }
    catch (err) {
    res.status(500).send(err)
    }
}

export const clearBoard = async  (req, res) => {
    try {   
        await boardPositionService.ClearBoard()
        res.json({"cleared": "true"})
    }
    catch (err) {
    res.status(500).send(err)
    }
}

