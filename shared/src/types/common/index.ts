import type { ObjectId } from "mongodb"

export interface Todo {
  _id: ObjectId
  completed: boolean
  text: string
}
