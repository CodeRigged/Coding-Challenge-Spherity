import { Backdrop, CircularProgress, Grid, Typography } from "@mui/material"

import { useAppStore } from "~/stores/index"

/**
 * Renders a loading overlay component.
 *
 * @return {JSX.Element} The loading overlay component
 */
const LoadingOverlay = () => {
  const { isPending, text } = useAppStore()

  return (
    <Backdrop sx={{ zIndex: theme => theme.zIndex.drawer + 1 }} open={isPending}>
      <Grid container flexDirection="column" justifyContent="center" alignItems="center">
        <CircularProgress color="inherit" />
        {text && (
          <Typography data-testid="loading-text" className="pt-1" component="div" variant="caption">
            {text}
          </Typography>
        )}
      </Grid>
    </Backdrop>
  )
}
export default LoadingOverlay
