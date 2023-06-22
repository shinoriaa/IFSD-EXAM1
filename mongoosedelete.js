const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    const databaseURI = 'mongodb+srv://riasbsc22:9980360580dad@cluster0.uarykpj.mongodb.net/?retryWrites=true&w=majority';
    const databaseName = 'Route-Leg-City'; // Specify your desired database name
    const collectionName = 'legs'; // Specify your desired collection name
;

  await mongoose.connect(databaseURI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: databaseName });

  const userSchema = new mongoose.Schema({
    sourceCity: String,
    DestinationCity: String,
    cost: Number
  });

  userSchema.methods.introduce = function() {
    console.log(`Source City name is  ${this.sourceCity}, Destination City is ${this.DestinationCity} and the cost is ${this.cost}.`);
  };

  const User = mongoose.model('User', userSchema, collectionName);

  const deletionResult = await User.deleteOne({ sourceCity: 'Bhubneswar' });
  console.log(`Deleted ${deletionResult.deletedCount} user.`);
}