const prompt = require('prompt-sync')();
const { MongoClient } = require('mongodb');

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

  async inputLegs() {
    const uri = 'mongodb+srv://riasbsc22:9980360580dad@cluster0.uarykpj.mongodb.net/?retryWrites=true&w=majority'; // MongoDB connection URI
    const client = new MongoClient(uri);

    try {
      await client.connect();

      for (let i = 0; i < this.numLegs; i++) {
        var sourceCityName = prompt(`Enter the source city name of leg ${i + 1}:`);
        var destinationCityName = prompt(`Enter the destination city name of leg ${i + 1}:`);
        var cost = parseFloat(prompt(`Enter the cost of leg ${i + 1}:`));

        var sourceCity = new City(sourceCityName);
        var destinationCity = new City(destinationCityName);

        var leg = new Leg(sourceCity, destinationCity, cost);
        this.legs.push(leg);

        // Store leg data in MongoDB
        var legData = {
          sourceCity: sourceCity.name,
          destinationCity: destinationCity.name,
          cost: leg.cost,
        };
        await client.db('Route-Leg-City').collection('legs').insertOne(legData);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      await client.close();
    }
  }

  async calculateTotalCost() {
    let totalCost = 0;

    const uri = 'mongodb+srv://riasbsc22:9980360580dad@cluster0.uarykpj.mongodb.net/?retryWrites=true&w=majority'; // MongoDB connection URI
    const client = new MongoClient(uri);

    try {
      await client.connect();

      // Retrieve leg data from MongoDB and calculate total cost
      var legsCollection = client.db('Route-Leg-City').collection('legs');
      const legs = await legsCollection.find().toArray();

      for (const leg of legs) {
        totalCost += leg.cost;
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      await client.close();
    }

    return totalCost;
  }
}

async function main() {
  var numLegs = parseInt(prompt("Enter the number of legs:"));
  var route = new Route(numLegs);

  await route.inputLegs();

  const totalCost = await route.calculateTotalCost();
  console.log(`The total cost of the trip is: ${totalCost}`);

  let createMoreUsers = prompt("Do you want to create more users? (yes/no):");
  while (createMoreUsers.toLowerCase() === "yes") {
    var numUsersToCreate = parseInt(prompt("Enter the number of users to create:"));
    await createUsers(numUsersToCreate);
    createMoreUsers = prompt("Do you want to create more users? (yes/no):");
  }
}

async function createUsers(n) {
  const uri = 'mongodb+srv://riasbsc22:9980360580dad@cluster0.uarykpj.mongodb.net/?retryWrites=true&w=majority'; // MongoDB connection URI
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db('Route-Legs-City'); // Replace with your database name

    const collection = db.collection('legs');

    const users = [];
    for (let i = 0; i < n; i++) {
      users.push({}); // Add an empty object for each user
    }

    const result = await collection.insertMany(users);

    console.log(`${result.insertedCount} users created.`);
  } catch (err) {
    console.error('Error creating users:', err);
  } finally {
    client.close();
  }
}

main();
