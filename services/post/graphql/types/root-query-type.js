const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLNonNull } = require("graphql");

const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => ({
        loadMessagesTarik: {
            type: new GraphQLObjectType({
                name: "Tests",
                description: "Tests",
                fields: () => ({
                    messageTarik: { type: GraphQLString }
                })
            }),
            description: "Send mail. ",
            resolve: async (_parent, args, _context, _info) => {
                res = { messageTarik: 'You dont have any unread messageTarik.' };
                return res;
            }
        },
    })
});

module.exports = RootQueryType;