let car = {
  brand: "Mahindra",
  getBrand: function() {
    return this.brand;
  }
};

let boundGetBrand = car.getBrand.bind(car);
console.log(boundGetBrand());
