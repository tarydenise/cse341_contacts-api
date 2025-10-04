require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { WebsiteRoutes } = require("./routes");
const cors = require("cors");
const app = express();
const port = process.env.port || 8080;

app.use(cors());
app.use("/", WebsiteRoutes);

console.log(process.env.MONGODB_URI)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
