const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.port;

const authRouter = require("./routes/auth_routes");
app.use("/auth", authRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
