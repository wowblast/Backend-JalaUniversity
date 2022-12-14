import 'reflect-metadata'
import { container } from '../../applicationCore/config/inversify.config'
import { IBoardPositionService } from '../../applicationCore/coreInterfaces/IBoardPositionService';
import { BoardPositionReposioryID } from '../../applicationCore/types.ts/inversifyTypes';
import GameBoardPositionEntity from '../../applicationCore/entities/gameBoardPositionEntity';



const boardPositionService = container.get<IBoardPositionService>(BoardPositionReposioryID)

export const  getBoardPositions = async  (req, res) => {
		try {
			//const id = req.params.id
            //boardPositionService.GetAllPositions()
			const product = 4//await getProduct(id)
            const allPositions: GameBoardPositionEntity[] = await boardPositionService.GetAllPositions()
            console.log("lsita" )
			res.json(allPositions)
            //res.json({"allPositions": 50})

		}
		catch (err) {
		res.status(500).send(err)
		}
	}

//app/cont