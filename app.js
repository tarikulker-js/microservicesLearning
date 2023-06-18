const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { getIntrospectionQuery, buildClientSchema, printSchema, buildSchema } = require('graphql');
const fetch = require('node-fetch');

const app = express();

app.get('/auth', (req, res) => {
    res.send('Auth Service');
});

app.get('/post', async (req, res) => {
    const response = await fetch('http://localhost:3002');
    const result = await response.json();
    console.log(result);
    res.json(result);
});

const urls = [
    'https://api.blindlook.app/api/graphql',
    'http://localhost:3002/graphql',
    // Diğer URL'leri buraya ekleyin
];

const fetchSchema = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: getIntrospectionQuery() }),
        });
        const schemaData = await response.json();
        const graphQLSchema = buildClientSchema(schemaData.data);

        return graphQLSchema;
    } catch (error) {
        console.error('GraphQL schema çekilemedi:', error);
        return null;
    }
};

const startServer = async () => {
    const schemas = [];

    // Tüm URL'lerden şemaları çek ve birleştir
    for (const url of urls) {
        const schema = await fetchSchema(url);
        if (schema) {
            schemas.push(schema);
        }
    }

    if (schemas.length > 0) {
        const mergedSchema = schemas.reduce((prevSchema, currSchema) => {
            return buildSchema(printSchema(prevSchema) + printSchema(currSchema));
        });

        const root = {};

        // Tüm query'leri ve mutation'ları root nesnesine ekle
        for (const schema of schemas) {
            const queryFields = schema.getQueryType().getFields();
            Object.keys(queryFields).forEach(fieldName => {
                root[fieldName] = (args, context, info, parent) => {
                    console.log(`Hello from ${fieldName} query!`);
                    console.log(args);
                };
            });

            const mutationFields = schema.getMutationType().getFields();
            Object.keys(mutationFields).forEach(fieldName => {
                root[fieldName] = (args, context, info, parent) => {
                    console.log(`Hello from ${fieldName} mutation!`);
                    console.log(args);
                };
            });
        }

        // GraphQL endpoint'i için middleware'i yapılandırın
        app.use(
            '/graphql',
            graphqlHTTP({
                schema: mergedSchema,
                rootValue: root,
                graphiql: true,
            })
        );

        let auth = true;

        app.use("/ready/graphql", graphqlHTTP({
            schema: require("./graphql/schema"),
            graphiql: auth ? {
                headerEditorEnabled: true
            } : false
        }));

        app.listen(3000, () => {
            console.log('Main Service is running on port 3000');
        });
    }
};

startServer();