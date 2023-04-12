const express = require("express");
const connectDB = require("./config/connectDB");
const user = require("./routes/user");
const config = require("config");
const port = config.get("PORT");
const app = express();
app.use(express.json());
app.use("/user", user);

connectDB();
const PORT = port || 5000;
app.listen(PORT, (err) =>
  err ? console.error(err) : console.log("server is raning on port 5000")
);
