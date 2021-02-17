const {gql} = require('apollo-server')

const typedefs = gql`
    type Author {
        fullName: String
    }

    type Book {
        name: String
        authorId: Int
    }

    type Query {
        books: [Book]
    }
`;

module.exports = typedefs;
