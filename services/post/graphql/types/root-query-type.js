const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLNonNull } = require("graphql");

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
                res = { message: 'You dont have any unread message.' };
                return res;
            }
        },
    })
});

module.exports = RootQueryType;