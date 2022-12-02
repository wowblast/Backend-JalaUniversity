class Reservation {
    from: Date;
    to: Date;
    destination: string;
    
    constructor(from, to,destination?) {
        this.from = from;
        typeof to === 'string' ? this.destination = to : this.to = to;
        destination ? this.destination = destination:null;
      }
    
}

type Reserve = {

    (from: Date, to: Date, destimation: string): Reservation

    (from: Date, destimation: string): Reservation

}



let reserve: Reserve = (from: Date, toOrDestination: Date | string, destination?: string) => {
     
    return new Reservation(from, toOrDestination, destination)

}

console.log(reserve(new Date(), new Date(), "ss"))
console.log(reserve(new Date(), "ss"))