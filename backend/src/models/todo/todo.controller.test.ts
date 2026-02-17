import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import request from "supertest"
import { afterAll, beforeAll, describe, it, vi } from "vitest"

import { TodoController } from "./todo.controller.js"
import { TodoService } from "./todo.service.js"

describe("TodoController (e2e)", () => {
  let app: INestApplication
  const todoService = {
    create: vi.fn().mockResolvedValue({ _id: "1", completed: false, text: "Created" }),
    findAll: vi.fn().mockResolvedValue([{ _id: "1", completed: false, text: "Test" }]),
    findOne: vi.fn().mockResolvedValue({ _id: "1", completed: false, text: "Test" }),
    remove: vi.fn().mockResolvedValue(undefined),
    update: vi.fn().mockResolvedValue({ _id: "1", completed: false, text: "Updated" }),
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [{ provide: TodoService, useValue: todoService }],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it("/todos (GET) should return all todos", async () => {
    await request(app.getHttpServer())
      .get("/todos")
      .expect(200)
      .expect([{ _id: "1", completed: false, text: "Test" }])
  })

  it("/todos/:id (GET) should return a todo by id", async () => {
    await request(app.getHttpServer()).get("/todos/1").expect(200).expect({ _id: "1", completed: false, text: "Test" })
  })

  it("/todos (POST) should create a todo", async () => {
    await request(app.getHttpServer())
      .post("/todos")
      .send({ text: "Created" })
      .expect(201)
      .expect({ _id: "1", completed: false, text: "Created" })
  })

  it("/todos/:id (PATCH) should update a todo", async () => {
    await request(app.getHttpServer())
      .patch("/todos/1")
      .send({ text: "Updated" })
      .expect(200)
      .expect({ _id: "1", completed: false, text: "Updated" })
  })

  it("/todos/:id (DELETE) should delete a todo", async () => {
    // Simulate that the todo exists before deletion
    todoService.findOne.mockResolvedValueOnce({ _id: "1", completed: false, text: "Test" })
    await request(app.getHttpServer()).delete("/todos/1").expect(200).expect({ deleted: true })
  })
})
