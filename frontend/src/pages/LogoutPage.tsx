import { Grid } from "@mui/material"
import { ReactElement } from "react"

/**
 * Renders a simple logout page with a grid layout.
 *
 * @return {ReactElement} The rendered logout page.
 */
const LogoutPage = (): ReactElement => {
  return (
    <Grid className="logout-page" container alignItems="center" justifyContent="center" spacing={2}>
      <Grid size="auto">
        <h1>You have been logged out</h1>
      </Grid>
    </Grid>
  )
}

export default LogoutPage
