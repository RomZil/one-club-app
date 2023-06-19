const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv").config({ path: __dirname + "/config/.env" });
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const schema = require("./schema/schema");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { expressMiddleware } = require("@apollo/server/express4");
const http = require("http");
const app = express();
const httpServer = http.createServer(app);
const port = process.env.port;
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const jwt = require("jsonwebtoken");

// Cron jobs
require("./crawlers/tasks");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(cors("*"));
app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => {
  console.error(error);
});
db.once("open", async () => {
  console.log("connected to MongoDB");
  await server.start();
  app.use(
    "/",
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ _id: getUserAuth(req) }),
    })
  );

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/`);
});

// Routes
const authRouter = require("./routes/auth_routes");
app.use("/auth", authRouter);

// Routes
const postRouter = require("./routes/post_routes");
app.use("/post", postRouter);

app.get("/test", async (req, res, next) => {});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function getUserAuth(req) {
  const allowedStrings = [
    "getPopularCategories {",
    "getPopularDeals {",
    "getCategories {",
    "getDeals {",
    "GetDealbyID",
    "GetDealsByCategory",
    "increasePopularDeal",
    "increasePopularCategory",
  ];
  let isAllowed = false;

  for (let i = 0; i < allowedStrings.length && !isAllowed; i++) {
    if (req.body.query.includes(allowedStrings[i])) {
      isAllowed = true;
      return;
    }
  }
  const authHeaders = req.headers.authorization || "";
  const token = authHeaders && authHeaders.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (decodedToken === null || decodedToken._id === null) {
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }
  return decodedToken._id;
}
