const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
// app.use(cors());


const corsConfig = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};
app.use(cors(corsConfig));


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
    

    // toyota advertisement Database
    const toyotaDb = client.db("toyota");
    const toyotaAdCollections = toyotaDb.collection("advertisement");
    
    const count = await toyotaAdCollections.countDocuments();
    if (count === 0) {
      const toyotaAd = [
        { image: "https://i.postimg.cc/43pYRTmL/1.webp" },
        { image: "https://i.postimg.cc/63wy91Z9/2.jpg" },
        { image: "https://i.postimg.cc/Jnqttc3j/3.jpg" },
      ];
      const options = { ordered: false };
      await toyotaAdCollections.insertMany(toyotaAd, options);
    }

    // Get Ford Advertisement Database
    const fordDb = client.db("ford");
    const fordAdCollections = fordDb.collection("advertisement");
    const fordCount = await fordAdCollections.countDocuments();
    if (fordCount === 0) {
      const fordAd = [
        { image: "https://i.postimg.cc/52LT56D7/1.webp" },
        { image: "https://i.postimg.cc/9Xknvdhg/2.webp" },
        { image: "https://i.postimg.cc/HxsNC3nR/3.jpg" },
      ];
      const options = { ordered: false };
      await fordAdCollections.insertMany(fordAd, options);
    }
    // Get bmw Advertisement Database
    const bmwDb = client.db("bmw");
    const bmwAdCollections = bmwDb.collection("advertisement");
    const bmwCount = await bmwAdCollections.countDocuments();
    if (bmwCount === 0) {
      const bmwAd = [
        { image: "https://i.postimg.cc/WzckQp24/1.jpg" },
        { image: "https://i.postimg.cc/d3RyvM1j/2.webp" },
        { image: "https://i.postimg.cc/5N1zgt77/bmw.png" },
      ];
      const options = { ordered: false };
      await bmwAdCollections.insertMany(bmwAd, options);
    }
    // Get mercedes Advertisement Database
    const mercedesDb = client.db("mercedes");
    const mercedesAdCollections = mercedesDb.collection("advertisement");
    const mercedesCount = await mercedesAdCollections.countDocuments();
    if (mercedesCount === 0) {
      const mercedesAd = [
        { image: "https://i.postimg.cc/760FxXyN/1.jpg" },
        { image: "https://i.postimg.cc/L5Srhf9F/2.jpg" },
        { image: "https://i.postimg.cc/W4BRLCx3/3.jpg" },
      ];
      const options = { ordered: false };
      await mercedesAdCollections.insertMany(mercedesAd, options);
    }
    // Get tesla Advertisement Database
    const teslaDb = client.db("tesla");
    const teslaAdCollections = teslaDb.collection("advertisement");
    const teslaCount = await teslaAdCollections.countDocuments();
    if (teslaCount === 0) {
      const teslaAd = [
        { image: "https://i.postimg.cc/0NX9FV0X/1.jpg" },
        { image: "https://i.postimg.cc/bwTyHyDh/2.webp" },
        { image: "https://i.postimg.cc/5t2xshLF/3.webp" },
      ];
      const options = { ordered: false };
      await teslaAdCollections.insertMany(teslaAd, options);
    }
    // Get tesla Advertisement Database
    const hondaDb = client.db("honda");
    const hondaAdCollections = hondaDb.collection("advertisement");
    const hondaCount = await hondaAdCollections.countDocuments();
    if (hondaCount === 0) {
      const hondaAd = [
        { image: "https://i.postimg.cc/s25gpLSB/1.jpg" },
        { image: "https://i.postimg.cc/fRtLbyRf/2.jpg" },
        { image: "https://i.postimg.cc/W1B4qVDL/3.jpg" },
      ];
      const options = { ordered: false };
      await hondaAdCollections.insertMany(hondaAd, options);
    }
    // Set  Product Under specific Brand
    app.post("/addProduct", async (req, res) => {
      const product = req.body;
      const { brandName, price, rating, image, description, type } = product;

      const database = client.db(brandName.toLowerCase());
      const productColelction = database.collection("products");

      const result = await productColelction.insertOne(product);
      res.send(result);
      console.log(result);
    });
    // Get Tesla Products from Database
    app.get("/tesla/products", async (req, res) => {
      const brandName = "Tesla";
      const brandDb = client.db(brandName.toLowerCase());
      const productCollections = brandDb.collection("products");
      const cursor = productCollections.find({});
      const result = await cursor.toArray();
      res.send(result);
    });

    // Get Toyota Products from database
    app.get("/toyota/products", async (req, res) => {
      const brandName = "Toyota";
      const brandDb = client.db(brandName.toLowerCase());
      const productCollections = brandDb.collection("products");
      const cursor = productCollections.find({});
      const result = await cursor.toArray();
      res.send(result);
    });

    // Get Tesla Products from Database
    app.get("/mercedes/products", async (req, res) => {
      const brandName = "Mercedes";
      const brandDb = client.db(brandName.toLowerCase());
      const productCollections = brandDb.collection("products");
      const cursor = productCollections.find({});
      const result = await cursor.toArray();
      res.send(result);
    });
    // Get Ford product From database
    app.get("/ford/products", async (req, res) => {
      const brandName = "Ford";
      const brandDb = client.db(brandName.toLowerCase());
      const productCollections = brandDb.collection("products");
      const cursor = productCollections.find({});
      const result = await cursor.toArray();
      res.send(result);
    });
    // Get bmw product From database
    app.get("/bmw/products", async (req, res) => {
      const brandName = "BMW";
      const brandDb = client.db(brandName.toLowerCase());
      const productCollections = brandDb.collection("products");
      const cursor = productCollections.find({});
      const result = await cursor.toArray();
      res.send(result);
    });
    // Get bmw product From database
    app.get("/honda/products", async (req, res) => {
      const brandName = "Honda";
      const brandDb = client.db(brandName.toLowerCase());
      const productCollections = brandDb.collection("products");
      const cursor = productCollections.find({});
      const result = await cursor.toArray();
      res.send(result);
    });

    // Get Toyota Advertisement
    app.get("/toyota/advertisement", async (req, res) => {
      const cursor = toyotaAdCollections.find({});
      const result = await cursor.toArray();
      res.send(result);
    });

    // Get Ford Advertisement
    app.get("/ford/advertisement", async (req, res) => {
      const cursor = fordAdCollections.find({});
      const result = await cursor.toArray();
      res.send(result);
    });
    // Get bmw Advertisement
    app.get("/bmw/advertisement", async (req, res) => {
      const cursor = bmwAdCollections.find({});
      const result = await cursor.toArray();
      res.send(result);
    });
    // Get mercedes Advertisement
    app.get("/mercedes/advertisement", async (req, res) => {
      const cursor = mercedesAdCollections.find({});
      const result = await cursor.toArray();
      res.send(result);
    });
    // Get tesla Advertisement
    app.get("/tesla/advertisement", async (req, res) => {
      const cursor = teslaAdCollections.find({});
      const result = await cursor.toArray();
      res.send(result);
    });
    // Get honda Advertisement
    app.get("/honda/advertisement", async (req, res) => {
      const cursor = hondaAdCollections.find({});
      const result = await cursor.toArray();
      res.send(result);
    });
    // Get all Data From Database

    app.get("/details/:id", async (req, res) => {
      const databaseNames = [
        "tesla",
        "toyota",
        "honda",
        "mercedes",
        "bmw",
        "ford",
      ]; // Replace with your database names
      const id = req.params.id; // Get the _id from the URL parameter

      const objectId = new ObjectId(id);

      for (const dbName of databaseNames) {
        const db = client.db(dbName);

        const collectionNames = [
          "products",
          "products",
          "products",
          "products",
          "products",
          "products",
        ]; // Replace with your collection names

        for (const collectionName of collectionNames) {
          const collection = db.collection(collectionName);

          const data = await collection.find({ _id: objectId }).toArray();

          if (data.length > 0) {
            res.send(data);
            return; // Stop looping if data is found in one of the collections
          }
        }
      }
    });

    // Update the Product
    app.put("/update/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedProduct = req.body;
      const product = {
        $set: {
          name: updatedProduct.name,
          brandName: updatedProduct.brandName,
          price: updatedProduct.price,
          rating: updatedProduct.rating,
          image: updatedProduct.image,
          description: updatedProduct.description,
          type: updatedProduct.type,
        },
      };
      const db = client.db(updatedProduct.brandName.toLowerCase());
      const productColelction = db.collection("products");
      const result = await productColelction.updateOne(
        filter,
        product,
        options
      );
      res.send(result);
    });

    // set product to database - add to cart
    app.post("/product", async (req, res) => {
      const addedProduct = req.body;
      const db = client.db("cartDB");
      const cartCollection = db.collection("cart");
      const result = await cartCollection.insertOne(addedProduct);
      res.send(result);
      
    });

    // Get the All Cart Products
    app.get("/products", async (req, res) => {
      const cartCollection = client.db("cartDB").collection("cart");
      const cursor = cartCollection.find({});
      const result = await cursor.toArray();
      res.send(result);
    });

    // delete from cart - remove from cart
    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const cartCollection = client.db("cartDB").collection("cart");
      const result = await cartCollection.deleteOne(query);
      res.send(result);

    });



  
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server Is Running");
});
app.listen(port, () => {
  console.log("listening on port", port);
});



