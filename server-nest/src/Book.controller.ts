import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {PrismaClient} from "@prisma/client";
import {AppService} from "./app.service";
import {CreateBookDto} from "./CreateBook.dto";
import {UpdateBookDto} from "./UpdateBook.dto";
import {DeleteBookDto} from "./DeleteBook.dto";
import {Book} from './Book'

@Controller('books')
export class BookController {
    private prisma: PrismaClient

    constructor(private readonly appService: AppService) {
        this.prisma = new PrismaClient()
    }

    @Get()
    async getAllBooks(): Promise<Book[]> {
        return await this
            .prisma
            .book
            .findMany()
            .finally(async () => {
                await this.prisma.$disconnect()
            });
    }

    @Get(':id')
    async getBook(@Param('id') id: number): Promise<Book> {
        return await this
            .prisma
            .book
            .findUnique({
                where: {
                    id: Number(id)
                }
            })
            .finally(async () => {
                await this.prisma.$disconnect()
            });
    }

    @Post()
    async createBook(@Body() createBookDto: CreateBookDto){
        console.log("Adding a book");
        const book = await this.prisma.book.create({
            data: {
                name: createBookDto.name,
                authorId: createBookDto.authorId
            }
        }).finally(async () => {await this.prisma.$disconnect()});
        console.log(book)
    }

    @Put()
    async updateBook(@Body() updateBookDto: UpdateBookDto){
        console.log("Updating a book");
        const book = await this.prisma.book.update({
            where: {id: updateBookDto.id},
            data: {
                name: updateBookDto.name,
                authorId: updateBookDto.authorId
            }
        }).finally(async () => {await this.prisma.$disconnect()});
        console.log(book)
    }

    @Delete()
    async deleteAuthor(@Body() deleteBookDto: DeleteBookDto){
        console.log("Deleting a book " + deleteBookDto.id);
        const book = await this.prisma.book.delete({
            where: {
                id: deleteBookDto.id
            }
        }).finally(async () => {await this.prisma.$disconnect()});
        console.log(book)
    }
}
