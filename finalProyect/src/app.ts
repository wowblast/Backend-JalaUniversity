import BoardService from './applicationCore/coreServices/boardService';
console.log("hello")
 import getLinearCongruentialGenerator from './applicationCore/utils/generateRandom'

const ser = new BoardService()
ser.CreateBoard(5)

const second = new Date().getSeconds()
const minute = new Date().getMinutes()

console.log(getLinearCongruentialGenerator(second,Math.round(5/2),5))
console.log(getLinearCongruentialGenerator(minute,Math.round(5/2),5))