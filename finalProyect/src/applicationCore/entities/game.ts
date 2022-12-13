import { Status } from '../types.ts/types';
export default class Game {    
    private status: Status
    constructor(
        status: Status
      ) {
        this.status = status
      }

    getStatus() {
        return this.status
    }  

    setStatus(status: Status) {
        this.status = status
    }
}