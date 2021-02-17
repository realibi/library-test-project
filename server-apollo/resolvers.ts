const resolvers = {
    Query: {
        books: (root, args, context) => context.dataSources().booksAPI.getAllBooks(),
    },
};

module.exports = resolvers;
