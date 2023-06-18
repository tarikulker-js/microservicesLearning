const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({message: 'Auth Service'});
});

const { Router } = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema/index.js");

const graphql_router = Router();
let auth = true;

app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: auth ? {
        headerEditorEnabled: true
    } : false
}));

app.listen(3001, () => {
  console.log('Auth Service is running on port 3001');
});