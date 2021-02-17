import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {AppService} from './app.service';
import {PrismaClient} from '@prisma/client'
import {CreateAuthorDto} from "./CreateAuthor.dto";
import {UpdateAuthorDto} from "./UpdateAuthor.dto";
import {DeleteAuthorDto} from "./DeleteAuthor.dto";
import {Author} from "./Author";

@Controller('authors')
export class AuthorController {
    private prisma: PrismaClient

    constructor(private readonly appService: AppService) {
        this.prisma = new PrismaClient()
    }

    @Get()
    async getAllAuthors(): Promise<Author[]> {
        return await this
            .prisma
            .author
            .findMany()
            .finally(async () => {await this.prisma.$disconnect()})
    }

    @Get(':id')
    async getAuthor(@Param('id') id: number): Promise<Author> {
        return await this
            .prisma
            .author
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
    async createAuthor(@Body() createAuthorDto: CreateAuthorDto){
        console.log("Adding an author");
        const author = await this.prisma.author.create({
            data: {
                fullName: createAuthorDto.fullName
            }
        }).finally(async () => {await this.prisma.$disconnect()});
        console.log(author)
    }

    @Put()
    async updateAuthor(@Body() updateAuthorDto: UpdateAuthorDto){
        console.log("Updating an author");
        const author = await this.prisma.author.update({
            where: {id: updateAuthorDto.id},
            data: {
                fullName: updateAuthorDto.fullName
            }
        }).finally(async () => {await this.prisma.$disconnect()});
        console.log(author)
    }

    @Delete()
    async deleteAuthor(@Body() deleteAuthorDto: DeleteAuthorDto){
        console.log("Deleting an author " + deleteAuthorDto.id);
        const author = await this.prisma.author.delete({
            where: {
                id: deleteAuthorDto.id
            }
        }).finally(async () => {await this.prisma.$disconnect()});
        console.log(author)
    }
}
