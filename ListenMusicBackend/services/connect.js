const mongoose = require("mongoose");
require("dotenv").config();

async function connectMongoDB(url) {
  return mongoose.connect(url);
}

const { MongoClient, ServerApiVersion } = require("mongodb");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const uri = `mongodb+srv://badmirohan031:${process.env.DB_PASSWORD}@listenmusic.rxiosyn.mongodb.net/?retryWrites=true&w=majority&appName=ListenMusic`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function connectMongoDBCluster() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    console.log(err);
  }
}
module.exports = { connectMongoDB, connectMongoDBCluster };
