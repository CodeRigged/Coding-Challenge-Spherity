import { Credential, IssueCredentialDto } from "shared/types"
import { create } from "zustand"

import { apiFetch } from "~/utils/api"

import { createPendingSlice, PendingState } from "./state-handlers"

interface CredentialStore extends PendingState {
  credentials: Credential[]
  addCredential: (data: IssueCredentialDto) => Promise<void>
  deleteCredential: (id: Credential["_id"]) => Promise<void>
  fetchCredentials: (subject?: string) => Promise<void>
  findCredential: (id: Credential["_id"]) => Promise<Credential | { error: string }>
  verifyCredential: (jwt: string) => Promise<{ valid: boolean; payload?: unknown; error?: string }>
}

const CREDENTIAL_API_ENDPOINT = "/credentials"

export const useCredentialStore = create<CredentialStore>((set, get, ...args) => ({
  ...createPendingSlice(set, get, ...args),
  credentials: [],
  addCredential: async data => {
    const { fetchCredentials, setIsPending } = get()
    setIsPending(true, "Issuing credential...")
    try {
      await apiFetch(`${CREDENTIAL_API_ENDPOINT}/issue`, {
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      })
      await fetchCredentials()
    } finally {
      setIsPending(false)
    }
  },
  deleteCredential: async id => {
    const { fetchCredentials, setIsPending } = get()
    setIsPending(true, "Deleting credential...")
    try {
      await apiFetch(`${CREDENTIAL_API_ENDPOINT}/${id}`, { method: "DELETE" })
      await fetchCredentials()
    } finally {
      setIsPending(false)
    }
  },
  fetchCredentials: async (subject?: string) => {
    const { setIsPending } = get()
    setIsPending(true, "Fetching credentials...")
    try {
      const res = await apiFetch(
        subject ? `${CREDENTIAL_API_ENDPOINT}?subject=${encodeURIComponent(subject)}` : CREDENTIAL_API_ENDPOINT
      )
      const credentials = await res.json()
      set({ credentials })
    } finally {
      setIsPending(false)
    }
  },
  findCredential: async id => {
    const { setIsPending } = get()
    setIsPending(true, "Sharing credential...")
    try {
      const res = await apiFetch(`${CREDENTIAL_API_ENDPOINT}/${id}`)
      return await res.json()
    } finally {
      setIsPending(false)
    }
  },
  verifyCredential: async jwt => {
    const { setIsPending } = get()
    setIsPending(true, "Verifying credential...")
    try {
      const res = await apiFetch(`${CREDENTIAL_API_ENDPOINT}/verify`, {
        body: JSON.stringify({ jwt }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      })
      return await res.json()
    } finally {
      setIsPending(false)
    }
  },
}))
