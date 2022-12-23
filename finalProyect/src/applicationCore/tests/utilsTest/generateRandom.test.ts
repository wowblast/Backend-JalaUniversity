import getLinearCongruentialGenerator from "../../utils/generateRandom";


describe('generate random between boardSize', () => {
  

  test('should generate a number between', async () => {
    const boardSize = 5;
    const multiplier = 8;
    const increment = 3;
    const random = getLinearCongruentialGenerator(multiplier, increment, boardSize);
    expect(random).toBeLessThan(boardSize);
    expect(random).toBeGreaterThanOrEqual(0);
  });

   
});