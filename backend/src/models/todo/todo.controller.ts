import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from "@nestjs/common"

import { Todo } from "./todo.schema.js"
import { TodoService } from "./todo.service.js"

/**
 * Controller for handling Todo API endpoints.
 */
@Controller("todos")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  /**
   * Get all todos.
   * @returns {Promise<Todo[]>} Array of todo documents
   */
  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todoService.findAll()
  }

  /**
   * Get a single todo by ID.
   * @param {string} id - The ID of the todo
   * @returns {Promise<Todo>} The found todo document
   * @throws {NotFoundException} If the todo is not found
   */
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Todo> {
    const todo = await this.todoService.findOne(id)
    if (!todo) {
      throw new NotFoundException("Todo not found")
    }
    return todo
  }

  /**
   * Create a new todo.
   * @param {object} body - The request body containing the text
   * @param {string} body.text - The text of the todo
   * @returns {Promise<Todo>} The created todo document
   */
  @Post()
  async create(@Body("text") text: string): Promise<Todo> {
    return this.todoService.create(text)
  }

  /**
   * Update a todo by ID.
   * @param {string} id - The ID of the todo to update
   * @param {object} update - The fields to update
   * @returns {Promise<Todo>} The updated todo document
   * @throws {NotFoundException} If the todo is not found
   */
  @Patch(":id")
  async update(@Param("id") id: string, @Body() update: Partial<Todo>): Promise<Todo> {
    const updated = await this.todoService.update(id, update)
    if (!updated) {
      throw new NotFoundException("Todo not found")
    }
    return updated
  }

  /**
   * Delete a todo by ID.
   * @param {string} id - The ID of the todo to delete
   * @returns {Promise<{ deleted: boolean }>} Deletion status
   * @throws {NotFoundException} If the todo is not found
   */
  @Delete(":id")
  async remove(@Param("id") id: string): Promise<{ deleted: boolean }> {
    const todo = await this.todoService.findOne(id)
    if (!todo) {
      throw new NotFoundException("Todo not found")
    }
    await this.todoService.remove(id)
    return { deleted: true }
  }
}
