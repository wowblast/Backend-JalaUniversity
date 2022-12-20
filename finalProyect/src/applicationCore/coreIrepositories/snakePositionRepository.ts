

export interface SnakePositionRepository {
    StartAutoMovemenvent(): Promise<void>
    StopAutoMovemenvent(): Promise<void>   
}