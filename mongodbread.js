const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://riasbsc22:9980360580dad@cluster0.uarykpj.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'Route-Leg-City';

// Function to read n users from MongoDB
async function readUsers(n) {
  // Create a new MongoClient
  const client = new MongoClient(url);

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Select the database
    const db = client.db(dbName);

    // Get the users collection
    const collection = db.collection('legs');

    // Read n users
    const users = await collection.find().limit(n).toArray();

    console.log(users);
  } catch (err) {
    console.error('Error reading users:', err);
  } finally {
    // Close the connection
    client.close();
  }
}

// Example usage
const numUsersToRead = 5;
readUsers(numUsersToRead);