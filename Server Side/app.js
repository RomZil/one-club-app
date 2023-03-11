// Require
const express = require("express");
const dotenv = require("dotenv").config({ path: __dirname + "/config/.env" });
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');


const app = express();
const port = process.env.port;

app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => {
  console.error(error);
});
db.once("open", () => console.log("connected to MongoDB"));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

// Routes
const authRouter = require("./routes/auth_routes");
app.use("/auth", authRouter);

// Routes
const postRouter = require("./routes/post_routes");
app.use("/post", postRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


