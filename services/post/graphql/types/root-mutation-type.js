const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLNonNull } = require("graphql");

const RootMutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutation",
    fields: () => ({
        sendMessageTarikMutation: {
            type: new GraphQLObjectType({
                name: "MessageTarikMutation",
                description: "MessageTarikMutation",
                fields: () => ({
                    messageTarikMutation: { type: GraphQLString },
                })
            }),
            description: "Send MessageTarikMutation. ",
            args: {
                user: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (_parent, args, _context, _info) => {
                res = { messageTarikMutation: 'Welcome ' + args.user };
                return res;
            }
        },
    })
});

module.exports = RootMutationType;