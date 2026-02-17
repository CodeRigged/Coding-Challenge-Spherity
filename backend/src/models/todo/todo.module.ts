import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { TodoController } from "./todo.controller.js"
import { Todo, TodoSchema } from "./todo.schema.js"
import { TodoService } from "./todo.service.js"

@Module({
  controllers: [TodoController],
  imports: [MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }])],
  providers: [TodoService],
})
export class TodoModule {}
