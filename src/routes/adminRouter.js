const express = require("express");

const debug = require("debug")("app:adminRouter");
const { MongoClient } = require("mongodb");
const products = require("../data/products.json");
const adminRouter = express.Router();

adminRouter.route("/").get((req, res) => {
  const url =
    "mongodb+srv://DbUser:ZfZBMiwUWcAz9CLh@store.zliv3da.mongodb.net/?retryWrites=true&w=majority";
  const dbName = "Store";
  const client = new MongoClient(url);

  (async function mongo() {
    try {
      await client.connect();
      debug("connected to mongo DB");
      const db = client.db(dbName);
      const response = await db.collection("products").insertMany(products);
      res.json(response);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  })();
});

module.exports = adminRouter;
