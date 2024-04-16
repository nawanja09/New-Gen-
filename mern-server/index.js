const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Mongodb Configuration

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://nawanjana_09:nawanjana@cluster0.q6uu8m5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    //create a collection of database
    const AccessoriesCollection = client.db("NEW_GEN").collection("Inventory");

    // Middleware to update `updatedAt` field before each update
    app.use("/accessories/:id", async (req, res, next) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = { $set: { updatedAt: new Date() } };

      await AccessoriesCollection.updateOne(filter, updateDoc);
      next();
    });

    //insert accessories to the db: post method
    app.post("/upload-accessories", async (req, res) => {
      const data = req.body;
      const result = await AccessoriesCollection.insertOne({
        ...data,
        createdAt: new Date(), // Set createdAt field when inserting
        updatedAt: new Date(), // Set updatedAt field when inserting
      });
      res.send(result);
    });

    //update a accessories data: patch or update methods
    app.patch("/accessories/:id", async (req, res) => {
      const id = req.params.id;
      const updateAccessoriesData = req.body;
      const filter = { _id: new ObjectId(id) };

      const result = await AccessoriesCollection.updateOne(filter, {
        $set: updateAccessoriesData,
      });
      res.send(result);
    });

    //delete a accessories data
    app.delete("/accessories/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await AccessoriesCollection.deleteOne(filter);
      res.send(result);
    });

    //find by category
    app.get("/all-accessories", async (req, res) => {
      let query = {};
      if (req.query?.Category) {
        query = { Category: req.query.Category };
      }
      const result = await AccessoriesCollection.find(query).toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
