const { GraphQLSchema } = require("graphql");
const RootMutationType = require("../types/root-mutation-type.js");
const RootQueryType = require("../types/root-query-type");

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

module.exports = schema;