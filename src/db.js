// src/db.js
const { MongoClient } = require('mongodb');

const uri = 'your-mongodb-connection-string';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const database = client.db('your-database-name');
    const collection = database.collection('your-collection-name');
    // Perform operations on the collection
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connect();

module.exports = client;