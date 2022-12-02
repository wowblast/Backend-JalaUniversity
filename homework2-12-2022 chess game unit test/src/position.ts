import { File, Rank } from "./types";

export default class Position {
    private rank;
    private file;

    public getRank(): Rank {
        return this.rank;
    }
    
    public getFile(): File {
        return this.file;
    }
    
    constructor( file: File,  rank: Rank){
        this.file = file;
        this.rank = rank;

    }
}