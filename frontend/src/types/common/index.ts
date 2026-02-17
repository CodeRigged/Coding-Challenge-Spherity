import { ReactNode } from "react"
import { To } from "react-router-dom"

export type LinkComponent = { to: To }
export type ChildComponent = {
  children?: ReactNode
}
