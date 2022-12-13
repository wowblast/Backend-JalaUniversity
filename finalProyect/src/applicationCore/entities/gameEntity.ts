import { Status } from '../types.ts/types';
import Board from './board';
export default class GameEntity extends Board{    
    private status: Status
    private stepIntervalBySeconds: number
    constructor(
        status: Status, stepIntervalBySeconds: number,size: number
      ) {
        super(size)
        this.stepIntervalBySeconds = stepIntervalBySeconds
        this.status = status
      }

    getStatus() {
        return this.status
    }  

    setStatus(status: Status) {
        this.status = status
    }

    getStepIntervalBySeconds() {
      return this.stepIntervalBySeconds
    }

    setStepIntervalBySeconds(stepIntervalBySeconds: number) {
      this.stepIntervalBySeconds = stepIntervalBySeconds

    }
}