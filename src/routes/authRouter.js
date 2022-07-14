const express = require("express");
const debug = require("debug")("app:authRouter");
const { MongoClient, ObjectID } = require("mongodb");
const passport = require("passport");
const authRouter = express.Router();

authRouter.route("/signUp").post((req, res) => {
  const { username, password } = req.body;
  const url =
    "mongodb+srv://DbUser:ZfZBMiwUWcAz9CLh@store.zliv3da.mongodb.net/?retryWrites=true&w=majority";
  const dbName = "Store";
  const client = new MongoClient(url);

  (async function addUser() {
    try {
      await client.connect();
      debug("connected to mongo DB");
      const db = client.db(dbName);
      const user = { username, password };
      const results = await db.collection("users").insertOne(user);
      debug(results);
      req.login(results.ops[0], () => {
        res.redirect("/auth/profile");
      });
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  })();
});

authRouter
  .route("/signIn")
  .get((req, res) => {
    res.render("signin");
  })
  .post(
    passport.authenticate("local", {
      successRedirect: "/auth/profile",
      failureRedirect: "/",
    })
  );
authRouter.route("/profile").get((req, res) => {
  res.json(req.user);
});

module.exports = authRouter;
