const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;
const uri =
  "mongodb+srv://nawanjana_09:nawanjana@cluster0.q6uu8m5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Middleware to update `updatedAt` field before each update
app.use("/accessories/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const AccessoriesCollection = client.db("NEW_GEN").collection("Inventory");
    const filter = { _id: new ObjectId(id) };
    const updateDoc = { $set: { updatedAt: new Date() } };
    await AccessoriesCollection.updateOne(filter, updateDoc);
    next();
  } catch (error) {
    console.error("Error updating updatedAt field:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Routes

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/upload-accessories", async (req, res) => {
  try {
    const AccessoriesCollection = client.db("NEW_GEN").collection("Inventory");
    const data = req.body;
    const result = await AccessoriesCollection.insertOne({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.send(result);
  } catch (error) {
    console.error("Error uploading accessories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.patch("/accessories/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const AccessoriesCollection = client.db("NEW_GEN").collection("Inventory");
    const updateAccessoriesData = req.body;
    const filter = { _id: new ObjectId(id) };
    const result = await AccessoriesCollection.updateOne(filter, {
      $set: updateAccessoriesData,
    });
    res.send(result);
  } catch (error) {
    console.error("Error updating accessory:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/accessories/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const AccessoriesCollection = client.db("NEW_GEN").collection("Inventory");
    const filter = { _id: new ObjectId(id) };
    const result = await AccessoriesCollection.deleteOne(filter);
    res.send(result);
  } catch (error) {
    console.error("Error deleting accessory:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/all-accessories", async (req, res) => {
  try {
    const AccessoriesCollection = client.db("NEW_GEN").collection("Inventory");
    let query = {};
    if (req.query?.Category) {
      query = { Category: req.query.Category };
    }
    const result = await AccessoriesCollection.find(query).toArray();
    res.send(result);
  } catch (error) {
    console.error("Error fetching accessories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/inventory-total", async (req, res) => {
  try {
    const { totalQuantity, outOfStockCount, totalValue, date } = req.body;

    const InventoryTotalCollection = client
      .db("NEW_GEN")
      .collection("Inventory_Total");

    const result = await InventoryTotalCollection.insertOne({
      totalQuantity,
      outOfStockCount,
      totalValue,
      date: new Date(date), // Convert date string to Date object
    });

    res.json({ message: "Inventory totals stored successfully" });
  } catch (error) {
    console.error("Error storing inventory totals:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
async function startServer() {
  await connectToMongoDB();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();
