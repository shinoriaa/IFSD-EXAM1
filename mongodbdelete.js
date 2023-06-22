const { MongoClient } = require('mongodb');

// Connection URL and database name
const url = 'mongodb+srv://riasbsc22:9980360580dad@cluster0.uarykpj.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'Route-Leg-City';

// Function to delete users from MongoDB
async function deleteUsers(filter) {
  // Create a new MongoClient
  const client = new MongoClient(url);

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Select the database
    const db = client.db(dbName);

    // Get the users collection
    const collection = db.collection('legs');

    // Delete users
    const result = await collection.deleteMany(filter);

    console.log(`${result.deletedCount} users deleted.`);
  } catch (err) {
    console.error('Error deleting users:', err);
  } finally {
    // Close the connection
    client.close();
  }
}

// Example usage
const filter = { sourceCity : 'Goa' };
deleteUsers(filter);