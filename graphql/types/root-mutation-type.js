const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLNonNull } = require("graphql");

const RootMutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutation",
    fields: () => ({
        sendMessage: {
            type: new GraphQLObjectType({
                name: "Message",
                description: "Message",
                fields: () => ({
                    message: { type: GraphQLString },
                })
            }),
            description: "Send Message. ",
            args: {
                user: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (_parent, args, _context, _info) => {
                res = { message: 'Welcome ' + args.user };
                return res;
            }
        },
        login: {
            type: new GraphQLObjectType({
                name: "Login",
                description: "Login",
                fields: () => ({
                    message: { type: GraphQLString },
                })
            }),
            description: "Login. ",
            args: {
                user: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (_parent, args, _context, _info) => {
                res = { message: 'Logined to ' + args.user };
                return res;
            }
        },
    })
});

module.exports = RootMutationType;