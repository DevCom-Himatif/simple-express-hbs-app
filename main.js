const { PORT, MONGODB_URL } = require("./constants/constants");
const routes = require("./routes/routes");
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(MONGODB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.on("error", console.error.bind(console, "MongoDB connection error"));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
