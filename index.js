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

const toyotaOffers = [
  {
    image:
      "https://di-uploads-pod13.dealerinspire.com/fletcherjonestoyotaofcarson/uploads/2023/10/Toyota-Tire-Offer-October-Desktop.png",
  },

  {
    image:
      "https://toyota.com.bd/media/images/8X4-Feet-Spare-Partanner-4-times_Copy.width-1920.jpgs-B",
  },
];

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("OfferDB");
    const toyotaCollection = database.collection("tyota");
    const bmwCollection = database.collection("bmw");

    app.get("/", (req, res) => {
      res.send("Server Is Running");
    });

    app.post("/toyota", async (req, res) => {
      const result = await toyotaCollection.insertOne(toyotaOffers);
      res.send(result);
    });

    app.get("/bmw", async (req, res) => {
      const cursor = bmwCollection.find({})
      const bmwOffers  = await cursor.toArray();
      res.send(bmwOffers);
    });

    app.get("/toyota", async (req, res) => {
      const cursor = toyotaCollection.find({});
      const toyotaOffers = await cursor.toArray();
      res.send(toyotaOffers);
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
