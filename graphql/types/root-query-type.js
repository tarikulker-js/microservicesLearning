//const { introspectionQuery, buildClientSchema, printSchema } = require('graphql');
const { GraphQLObjectType, GraphQLString, getIntrospectionQuery, buildClientSchema, printSchema } = require("graphql");
let { AUTH_PORT, POST_PORT } = require("../../portList.json")

const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => ({
        getMessages: {
            type: new GraphQLObjectType({
                name: "Messages",
                description: "Messages",
                fields: () => ({
                    message: { type: GraphQLString }
                })
            }),
            description: "Send mail. ",
            resolve: async (_parent, args, _context, _info) => {
                console.log(_info)
                //const operationName = _info.fieldName;
                //const query = _info.operation.selectionSet.loc.source.body;

                //return await fetch(`http://localhost:${POST_PORT}/graphql`, {
                //    method: "POST",
                //    headers: { 'Content-Type': "application/json" },
                //    body: JSON.stringify({
                //        query: query
                //    })
                //})
                //    .then(response => response.json())
                //    .then((result) => {
                //        console.log(result);
                //        result = result.data[operationName];
                //        return result;
                //    })
                //    .catch((err) => {
                //        throw new Error(err);
                //    })

            }
        },
        user: {
            type: new GraphQLObjectType({
                name: "UserMessages",
                description: "Messages",
                fields: () => ({
                    message: { type: GraphQLString }
                })
            }),
            description: "Send mail. ",
            resolve: async (_parent, args, _context, _info) => {
                const operationName = _info.fieldName;
                const query = _info.operation.selectionSet.loc.source.body;

                return await fetch(`http://localhost:${AUTH_PORT}/graphql`, {
                    method: "POST",
                    headers: { 'Content-Type': "application/json" },
                    body: JSON.stringify({
                        query: query
                    })
                })
                    .then(response => response.json())
                    .then((result) => {
                        console.log(result);
                        result = result.data[operationName];
                        return result;
                    })
                    .catch((err) => {
                        throw new Error(err);
                    })

            }
        },
    })
});

module.exports = RootQueryType;