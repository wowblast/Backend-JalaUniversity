export default function getLinearCongruentialGenerator (multiplier: number, incremente: number, modulus: number): number {
  let random = 7
  random = (multiplier * random + incremente) % modulus

  return random
}
