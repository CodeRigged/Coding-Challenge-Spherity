import { Box, Button, TextField } from "@mui/material"
import { useState } from "react"

import { useErrorStore } from "~/stores/state-handlers"
import { useTodoStore } from "~/stores/todo-store"

const TodoForm = () => {
  const [newTodo, setNewTodo] = useState("")
  const { addTodo, isPending } = useTodoStore()
  const { setError } = useErrorStore()

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodo.trim()) return
    await addTodo(newTodo).catch(setError)
    setNewTodo("")
  }

  return (
    <Box component="form" onSubmit={handleAdd} mb={3} display="flex" gap={2}>
      <TextField
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
        disabled={isPending}
        size="small"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" disabled={isPending || !newTodo.trim()}>
        Add
      </Button>
    </Box>
  )
}

export default TodoForm
