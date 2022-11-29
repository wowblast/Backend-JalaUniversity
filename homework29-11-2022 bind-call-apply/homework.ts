var car = { 
    registrationNumber: "GA12345",
    brand: "Toyota",

    displayDetails: function(ownerName: string){
        console.log(ownerName + ", this is your car: " + this.registrationNumber + " " + this.brand);
    }
    

}
var car2 = { 
    registrationNumber: "4500FFQ",
    brand: "Susuki",
    }
function displayDetails(ownerName: string) {
    console.log(ownerName + ", this is your car: " + this.registrationNumber + " " + this.brand);
}
var myCarDetails = car.displayDetails.bind(car, "Vivian");
myCarDetails()
  
displayDetails.apply(car, ["Vivian"]);
displayDetails.call(car2, "Vivian");