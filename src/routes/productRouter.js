const express = require("express");
const debug = require("debug")("app:productRouter");
const { MongoClient, ObjectId } = require("mongodb");
// const products = require("../data/products.json");
const productRouter = express.Router();

productRouter.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/auth/signIn");
  }
});

productRouter.route("/").get((req, res) => {
  const url =
    "mongodb+srv://DbUser:ZfZBMiwUWcAz9CLh@store.zliv3da.mongodb.net/?retryWrites=true&w=majority";
  const dbName = "Store";
  const client = new MongoClient(url);

  (async function mongo() {
    try {
      await client.connect();
      debug("connected to mongo DB");
      const db = client.db(dbName);
      const products = await db.collection("products").find().toArray();
      debug(products);
      res.render("products", { products });
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  })();
});
productRouter.route("/:id").get((req, res) => {
  const id = req.params.id;
  const url =
    "mongodb+srv://DbUser:ZfZBMiwUWcAz9CLh@store.zliv3da.mongodb.net/?retryWrites=true&w=majority";
  const dbName = "Store";
  const client = new MongoClient(url);

  (async function mongo() {
    try {
      await client.connect();
      debug("connected to mongo DB");
      const db = client.db(dbName);
      const product = await db
        .collection("products")
        .findOne({ _id: new ObjectId(id) });
      res.render("product", {
        product,
      });
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  })();
});

module.exports = productRouter;
