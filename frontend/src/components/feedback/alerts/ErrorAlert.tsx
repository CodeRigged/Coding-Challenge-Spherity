import CloseIcon from "@mui/icons-material/Close"
import { Alert, AlertTitle, IconButton, Snackbar } from "@mui/material"

import { useErrorStore } from "~/stores/state-handlers"

import { autoHideDuration } from "./ErrorAlert.constants"

/**
 * Renders the AppAlert component displaying error messages in a Snackbar.
 *
 * NOTE: might want to use  [notistack](https://github.com/iamhosseindhv/notistack) for more flexibility.
 *
 * @return {JSX.Element} The rendered AppAlert component.
 */
const AppAlert = () => {
  const { error, setError } = useErrorStore()
  return (
    <Snackbar
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      open={!!error}
      autoHideDuration={autoHideDuration}
      onClose={() => setError()}
    >
      <Alert
        severity="error"
        color="error"
        variant="filled"
        action={
          <IconButton aria-label="close" color="inherit" size="small" onClick={() => setError()}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2, minWidth: "250px" }}
      >
        {error && (
          <>
            <AlertTitle>{error.name}</AlertTitle>
            {error.message}
          </>
        )}
      </Alert>
    </Snackbar>
  )
}
export default AppAlert
