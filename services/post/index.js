const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({message: 'Post Service'});
});

const { Router } = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");

const graphql_router = Router();
let auth = true;

app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: auth ? {
        headerEditorEnabled: true
    } : false
}));

app.listen(3002, () => {
  console.log('Post Service is running on port 3002');
});