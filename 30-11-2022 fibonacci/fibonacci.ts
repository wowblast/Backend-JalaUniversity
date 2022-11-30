function* createn(): IterableIterator<number> {
    let a = 0, b = 1, c = 0;

    while (1) {
        yield a
        c = a + b
        a = b;
        b = c;



    }
}

let numberss = createn()
console.log(numberss.next())
console.log(numberss.next())
console.log(numberss.next())
console.log(numberss.next())
console.log(numberss.next())
console.log(numberss.next())
console.log(numberss.next())
console.log(numberss.next())