const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLNonNull } = require("graphql");

const RootMutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutation",
    fields: () => ({
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