const passport = require("passport");
const { Strategy } = require("passport-local");
const { MongoClient } = require("mongodb");
const debug = require("debug")("app:localStrategy");

module.exports = function localStrategy() {
  passport.use(
    new Strategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      (username, password, done) => {
        const url =
          "mongodb+srv://DbUser:ZfZBMiwUWcAz9CLh@store.zliv3da.mongodb.net/?retryWrites=true&w=majority";
        const dbName = "Store";
        const client = new MongoClient(url);

        (async function validateUser() {
          try {
            await client.connect();
            debug("connected to mongo DB");
            const db = client.db(dbName);
            const user = await db.collection("users").findOne({ username });

            if (user && user.password === password) {
              done(null, user);
            } else {
              done(null, false);
            }
          } catch (e) {
            console.error(e);
          } finally {
            await client.close();
          }
        })();
      }
    )
  );
};
