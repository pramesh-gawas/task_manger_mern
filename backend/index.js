const express = require("express");
const app = express();
require("dotenv").config();
require("./models/db");
const PORT = process.env.PORT || 3000;
const taskrouter = require("./routes/taskRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
app.get("/", (req, res) => {
  res.send("hello");
});
app.use(cors());
app.use(bodyParser.json());
app.use("/task", taskrouter);
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
