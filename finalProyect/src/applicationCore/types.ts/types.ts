export type SnakeDirection = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type BoardPositionType = 'head' |'body' | 'food' | 'empty';
export type GameStatus = 'Ready' | 'Playing' | 'Ended'
export const GameStatusStates  ={
    ReadyState: 'Ready',
    Playing: 'Playing',
    EndState: 'Ended'
}
export const BoardPositionTypesList  ={
    Head: 'head',
    Boody: 'body',
    Food: 'food',
    Empty : 'empty'
}

export const SnakeDirectionsList = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT'
}