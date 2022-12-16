export default function getLinearCongruentialGenerator(multiplier: number, incremente: number, modulus: number){
    let random = 1
    random = (multiplier * random + incremente) % modulus;

    return random;
}