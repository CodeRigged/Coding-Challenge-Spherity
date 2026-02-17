import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Nullable } from "shared/types"

import { Todo } from "./todo.schema.js"

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  /**
   * Fetch all todos from the database.
   * @returns {Promise<Todo[]>} Array of todo documents
   */
  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().sort({ createdAt: "desc" })
  }

  /**
   * Find a todo by its ID.
   * @param {string} id - The ID of the todo to find
   * @returns {Promise<Nullable<Todo>>} The found todo document, or null if not found
   */
  async findOne(id: string): Promise<Nullable<Todo>> {
    return this.todoModel.findById(id)
  }

  /**
   * Create a new todo with the given text.
   * @param {string} text - The text of the todo
   * @returns {Promise<Todo>} The created todo document
   */
  async create(text: string): Promise<Todo> {
    const created = new this.todoModel({ text })
    return created.save()
  }

  /**
   * Update a todo by its ID.
   * @param {string} id - The ID of the todo to update
   * @param {Partial<Todo>} update - The fields to update
   * @returns {Promise<Nullable<Todo>>} The updated todo document, or null if not found
   */
  async update(id: string, update: Partial<Todo>): Promise<Nullable<Todo>> {
    return this.todoModel.findByIdAndUpdate(id, update, { new: true })
  }

  /**
   * Delete a todo by its ID.
   * @param {string} id - The ID of the todo to delete
   * @returns {Promise<void>}
   */
  async remove(id: string): Promise<void> {
    await this.todoModel.findByIdAndDelete(id)
  }
}
