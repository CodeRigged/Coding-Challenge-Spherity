import { Todo } from "shared/types"
import { create } from "zustand"

import { apiFetch } from "~/utils/api"

import { createPendingSlice, PendingState } from "./state-handlers"

interface TodoStore extends PendingState {
  todos: Todo[]
  addTodo: (text: string) => Promise<void>
  deleteTodo: (id: Todo["_id"]) => Promise<void>
  fetchTodos: () => Promise<void>
  updateTodo: (id: Todo["_id"], updates: Partial<Pick<Todo, "text">>) => Promise<void>
}

const TODO_API_ENDPOINT = "/todos"

export const useTodoStore = create<TodoStore>((set, get, ...args) => ({
  ...createPendingSlice(set, get, ...args),
  todos: [],
  addTodo: async text => {
    const { fetchTodos, setIsPending } = get()
    setIsPending(true, "Adding todo...")
    try {
      await apiFetch(TODO_API_ENDPOINT, {
        body: JSON.stringify({ text }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      })
      await fetchTodos()
    } finally {
      setIsPending(false)
    }
  },
  deleteTodo: async id => {
    const { fetchTodos, setIsPending } = get()
    setIsPending(true, "Deleting todo...")
    try {
      await apiFetch(`${TODO_API_ENDPOINT}/${id}`, { method: "DELETE" })
      await fetchTodos()
    } finally {
      setIsPending(false)
    }
  },
  fetchTodos: async () => {
    const { setIsPending } = get()
    setIsPending(true, "Fetching todos...")
    try {
      const res = await apiFetch(TODO_API_ENDPOINT)
      const todos = await res.json()
      set({ todos })
    } finally {
      setIsPending(false)
    }
  },
  updateTodo: async (id, updates) => {
    const { fetchTodos, setIsPending } = get()
    setIsPending(true, "Updating todo...")
    try {
      await apiFetch(`${TODO_API_ENDPOINT}/${id}`, {
        body: JSON.stringify(updates),
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
      })
      await fetchTodos()
    } finally {
      setIsPending(false)
    }
  },
}))
