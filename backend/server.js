require("dotenv").config();
const express = require("express");
const mongodb = require("./db/connect");
const routes = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.port || 8080;

mongodb.initDb((err) => {
  if (err) {
    console.error("failed to initialize DB", err);
    process.exit(1);
  } else {
    console.log("DB initialized, starting server...");
    app.use(express.json());
    app.use("/contacts", routes);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});

app.use(cors());
app.use("/", require("./routes"));

console.log(process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
