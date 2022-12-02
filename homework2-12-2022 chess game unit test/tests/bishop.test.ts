import Bishop from '../src/bishop';
import Position from '../src/position';

let bishop;
beforeEach(()=> {
    bishop = new Bishop('White','C',1)
})

it("Shouldn't move vertically", () => {
    let position = new Position('C',8);
    expect(bishop.canMoveTo(position)).toBe(false)
})

it("Shouldn't move horizaontally", () => {
    let position = new Position('A',1);
    expect(bishop.canMoveTo(position)).toBe(false)
})

it("Shouldn move diagonally", () => {
    let position = new Position('H',6);
    expect(bishop.canMoveTo(position)).toBe(true)
    position = new Position('A',3)
    expect(bishop.canMoveTo(position)).toBe(true)

})

it("Shouldn't move L", () => {
    let position = new Position('D',3);
    expect(bishop.canMoveTo(position)).toBe(false)

    position = new Position('B',3);
    expect(bishop.canMoveTo(position)).toBe(false)
})

it("Shouldn't move other places", () => {
    let position = new Position('C',5);
    expect(bishop.canMoveTo(position)).toBe(false)

    position = new Position('F',8);
    expect(bishop.canMoveTo(position)).toBe(false)

   
})
