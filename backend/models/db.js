const mongoose = require("mongoose");

const URL = process.env.atlas_URL;

mongoose
  .connect(URL)

  .then(() => {
    console.log("database is connected");
  })
  .catch((error) => {
    console.log("database disconnected", error);
  });
