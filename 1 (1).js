const prompt = require('prompt-sync')();

class City {
  constructor(name) {
    this.name = name;
  }
}

class Leg {
  constructor(sourceCity, destinationCity, cost) {
    this.sourceCity = sourceCity;
    this.destinationCity = destinationCity;
    this.cost = cost;
  }
}

class Route {
  constructor(numLegs) {
    this.numLegs = numLegs;
    this.legs = [];
  }

  inputLegs() {
    for (let i = 0; i < this.numLegs; i++) {
      const sourceCityName = prompt(`Enter the source city name of leg ${i + 1}:`);
      const destinationCityName = prompt(`Enter the destination city name of leg ${i + 1}:`);
      const cost = parseFloat(prompt(`Enter the cost of leg ${i + 1}:`));

      const sourceCity = new City(sourceCityName);
      const destinationCity = new City(destinationCityName);

      this.legs.push(new Leg(sourceCity, destinationCity, cost));
    }
  }

  calculateTotalCost() {
    let totalCost = 0;
    for (const leg of this.legs) {
      totalCost += leg.cost;
    }
    return totalCost;
  }
}

function main() {
  const numLegs = parseInt(prompt("Enter the number of legs:"));
  const route = new Route(numLegs);

  route.inputLegs(); 

  const totalCost = route.calculateTotalCost();
  console.log(`The total cost of the trip is: ${totalCost}`);
}

main();
