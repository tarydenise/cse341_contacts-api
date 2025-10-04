const express = require("express");
const { WebsiteRoutes } = require("./routes");
const cors = require("cors");
const app = express();
const port = process.env.port || 8080;

app.use(cors());
app.use("/", WebsiteRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
