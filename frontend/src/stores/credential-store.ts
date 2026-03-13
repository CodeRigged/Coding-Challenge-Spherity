/**
 * Zustand store for managing credentials.
 *
 * Provides actions to issue, delete, fetch, find, and verify credentials via API endpoints.
 * Handles pending state for UI feedback during asynchronous operations.
 *
 * Note: Translations are not supported for this store for simplicity reasons.
 */
import { Credential, IssueCredentialDto, VerifyCredentialResult } from "shared/types"
import { create } from "zustand"

import { apiFetch } from "~/utils/api"

import { createPendingSlice, PendingState } from "./state-handlers"

/**
 * CredentialStore interface for Zustand state management.
 */
interface CredentialStore extends PendingState {
  /** List of all credentials in the store */
  credentials: Credential[]
  /**
   * Issues a new credential and refreshes the credential list.
   * @param data - Credential issuance payload
   */
  addCredential: (data: IssueCredentialDto) => Promise<void>
  /**
   * Deletes a credential by its ID and refreshes the credential list.
   * @param id - Credential ID
   */
  deleteCredential: (id: Credential["_id"]) => Promise<void>
  /**
   * Fetches all credentials, optionally filtered by subject.
   * @param subject - Optional subject filter
   */
  fetchCredentials: (subject?: string) => Promise<void>
  /**
   * Fetches a single credential by its ID.
   * @param id - Credential ID
   * @returns Credential object or Error
   */
  findCredential: (id: Credential["_id"]) => Promise<Credential | Error>
  /**
   * Verifies a credential JWT and returns the verification result.
   * @param jwt - Credential JWT
   * @returns Verification result
   */
  verifyCredential: (jwt: string) => Promise<VerifyCredentialResult>
}

const CREDENTIAL_API_ENDPOINT = "/credentials"

export const useCredentialStore = create<CredentialStore>((set, get, ...args) => ({
  ...createPendingSlice(set, get, ...args),
  credentials: [],
  addCredential: async (data: IssueCredentialDto) => {
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
  deleteCredential: async (id: Credential["_id"]) => {
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
  findCredential: async (id: Credential["_id"]) => {
    const { setIsPending } = get()
    setIsPending(true, "Fetching credential...")
    try {
      const res = await apiFetch(`${CREDENTIAL_API_ENDPOINT}/${id}`)
      return await res.json()
    } finally {
      setIsPending(false)
    }
  },
  verifyCredential: async (jwt: string) => {
    const { setIsPending } = get()
    setIsPending(true, "Verifying credential...", true)
    try {
      const res = await apiFetch(`${CREDENTIAL_API_ENDPOINT}/verify`, {
        body: JSON.stringify({ jwt }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      })
      return (await res.json()) as VerifyCredentialResult
    } finally {
      setIsPending(false)
    }
  },
}))
