const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

// Middleware
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.csegahf.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("OfferDB");
    const toyotaCollection = database.collection("toyota");
    const bmwCollection = database.collection("bmw");
    const fordCollection = database.collection("ford");
    const teslaCollection = database.collection("tesla");
    const hondaCollection = database.collection("honda");
    const marcedezCollection = database.collection("marcedez");

    app.get("/", (req, res) => {
      res.send("Server Is Running");
    });

    app.get("/toyota", async (req, res) => {
      const cursor = toyotaCollection.find({});
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("bmw", async (req, res) => {
      const cursor = bmwCollection.find({});
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/ford", async (req, res) => {
      const cursor = fordCollection.find({});
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/honda", async (req, res) => {
      const cursor = hondaCollection.find({});
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/marcedez", async (req, res) => {
      const cursor = marcedezCollection.find({});
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/tesla", async (req, res) => {
      const cursor = teslaCollection.find({});
      const result = await cursor.toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("listening on port", port);
});
