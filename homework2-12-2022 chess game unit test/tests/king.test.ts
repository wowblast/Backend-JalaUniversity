import King from '../src/king'
import Position from '../src/position';
let king;
beforeEach(()=> {
    king = new King('White','E',1)
})

it("Should move one place forward", () => {
    let position = new Position('E',2);
    expect(king.canMoveTo(position)).toBe(true)
})

it("Shouldn't  move to the same place", () => {
    let position = new Position('E',1);
    expect(king.canMoveTo(position)).toBe(false)
})

it("Should move one place to the left", () => {
    let position = new Position('D',1);
    expect(king.canMoveTo(position)).toBe(true)
})

it("Shouldn't move  forward than 1 space", () => {
    let position = new Position('E',3);
    expect(king.canMoveTo(position)).toBe(false)
})