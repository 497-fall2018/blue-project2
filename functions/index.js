const functions = require('firebase-functions');
const MyGraphQLSchema = require('./graphql/schema');
const express = require('express');
const graphqlHTTP = require('express-graphql');

const cors = require("cors");
const app = express();
app.use(cors({ origin: true }));


MyGraphQLSchema.applyMiddleware({ app });

app.use('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true
}))

exports.api = functions.https.onRequest(app);
