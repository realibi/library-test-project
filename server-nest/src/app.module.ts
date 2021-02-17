import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AuthorController} from "./Author.controller";
import {BookController} from "./Book.controller";

@Module({
  imports: [],
  controllers: [AppController, AuthorController, BookController],
  providers: [AppService],
})
export class AppModule {}
