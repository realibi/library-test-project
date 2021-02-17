const { RESTDataSource } = require('apollo-datasource-rest');

class BooksAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3000/';
        this.initialize({});
    }

    async getBook(id) {
        return this.get(`books/${id}`);
    }

    async getAllBooks() {
        return this.get(`books`);
    }

    async addBook(book) {
        return this.post(
            `books`, // path
            book, // request body
        );
    }

    async updateBook(book) {
        return this.put(
            `books`, // path
            book, // request body
        );
    }

    async deleteBook(book) {
        return this.delete(
            `movies/${book.id}`, // path
        );
    }
}

module.exports = BooksAPI;
