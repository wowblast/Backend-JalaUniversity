import Queen from '../src/queen';
import Position from '../src/position';

let queen;
beforeEach(()=> {
    queen = new Queen('White','D',1)
})

it("Should move vertically", () => {
    let position = new Position('D',8);
    expect(queen.canMoveTo(position)).toBe(true)
})

it("Should move horizontally", () => {
    let position = new Position('A',1);
    expect(queen.canMoveTo(position)).toBe(true)
    position = new Position('H',1);
    expect(queen.canMoveTo(position)).toBe(true)
})

it("Should move diagonally", () => {
    let position = new Position('H',5);
    expect(queen.canMoveTo(position)).toBe(true)

    position = new Position('A',4);
    expect(queen.canMoveTo(position)).toBe(true)

})

it("Shouldn't move L", () => {
    let position = new Position('C',3);
    expect(queen.canMoveTo(position)).toBe(false)

    position = new Position('E',3);
    expect(queen.canMoveTo(position)).toBe(false)
})

it("Shouldn't move other places", () => {
    let position = new Position('C',5);
    expect(queen.canMoveTo(position)).toBe(false)

    position = new Position('F',8);
    expect(queen.canMoveTo(position)).toBe(false)

    position = new Position('A',8);
    expect(queen.canMoveTo(position)).toBe(false)

    position = new Position('D',1);
    expect(queen.canMoveTo(position)).toBe(false)
})

