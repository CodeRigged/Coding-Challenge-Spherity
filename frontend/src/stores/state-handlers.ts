import { Nullable } from "shared/types"
import { create, StateCreator } from "zustand"

interface ErrorStore {
  error: Nullable<Error>
  setError: (error?: Nullable<Error>) => void
}

export const useErrorStore = create<ErrorStore>(set => ({
  error: null,
  setError: (error = null) => {
    set({ error })
  },
}))

export interface PendingState {
  disableSpinner: boolean
  isPending: boolean
  text: Nullable<string>
  setIsPending: (pending: boolean, text?: Nullable<string>, disableSpinner?: boolean) => void
}

export const createPendingSlice: StateCreator<PendingState> = set => ({
  disableSpinner: false,
  isPending: false,
  text: null,
  setIsPending: (isPending, text = null, disableSpinner = false) => {
    set({ disableSpinner, isPending, text })
  },
})
