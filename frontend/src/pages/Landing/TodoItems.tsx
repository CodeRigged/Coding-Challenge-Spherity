import { Stack, Typography } from "@mui/material"

import { useTodoStore } from "~/stores/todo-store"

import TodoListItem from "./TodoListItem"

const TodoItems = () => {
  const { isPending, todos } = useTodoStore()
  return (
    <Stack spacing={2}>
      {todos.map(todo => (
        <TodoListItem key={todo._id as unknown as string} todo={todo} />
      ))}
      {todos.length === 0 && !isPending && (
        <Typography align="center" color="text.secondary" mt={2}>
          No todos yet.
        </Typography>
      )}
    </Stack>
  )
}

export default TodoItems
