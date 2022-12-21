export interface GameMovementService {
  StartAutoMovemenvent: () => Promise<void>
  StopAutoMovemenvent: () => Promise<void>
}
