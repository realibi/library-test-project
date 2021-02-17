const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typedefs.ts');
const resolvers = require('./resolvers.ts');
const BooksAPI = require('./datasources/BooksAPI.ts');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
        dataSources: () => {
            return{
                booksAPI: new BooksAPI(),
            }
        }
    }),
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
