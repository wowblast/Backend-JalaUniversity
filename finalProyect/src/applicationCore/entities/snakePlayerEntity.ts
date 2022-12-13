import { Direction } from "../types.ts/types"

export default class SnakePlayerEntity {
    private playerId: number
    private name: string
    private direction: Direction
    private score: number
    constructor(playerId: number, name: string, direction: Direction, score: number      ) {
        this.playerId = playerId
        this.name = name
        this.direction = direction
        this.score = score
    }
    getPLayerId(): number {
        return this.playerId
    }
    setPlayerId(playerId: number) {
        this.playerId = playerId
    }
    getName(): string {
        return this.name
    }
    setName(name: string) {
        this.name = name
    }

    getDirection(): Direction {
        return this.direction
    }

    getScore(): number {
        return this.score
    }

    setScore(score: number) {
        this.score = score
    }

}
