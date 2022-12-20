export default class SnakePlayerLeaderBoardEntity {
    private id: number
    private playerId: number
    private name: string
    private score: number
      constructor(id: number, playerId: number, name: string, score: number) {
        this.id = id
        this.playerId = playerId
        this.name = name
        this.score = score
    }
    getId(): number {
      return this.id
    }

    getPlayerId(): number {
        return this.playerId
    }

    setPlayerId(playerId) {
        this.playerId = playerId
    }

    getName(): string {
        return this.name
    }

    setName(name: string) {
        this.name = name
    }

    getScore(): number {
        return this.score
    }

    setScore(score: number) {
        this.score = score
    }
  }