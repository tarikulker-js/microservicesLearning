const express = require('express');
const app = express();

app.get('/auth', (req, res) => {
    res.send('Auth Service');
});

app.get('/post', async (req, res) => {
    await fetch("http://localhost:3002", {
        method: "GET"
    })
    .then(response => response.json())
    .then((result) => {
        console.log(result);
        res.json(result);
    })
});

const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
let auth = true;

app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: auth ? {
        headerEditorEnabled: true
    } : false
}));

app.listen(3000, () => {
    console.log('Main Service is running on port 3000');
});