import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom"

/**
 * BackButton component renders an icon button with a back arrow.
 *
 * When clicked, it navigates the user to the previous page using React Router's `useNavigate` hook.
 *
 * @component
 * @example <BackButton />
 *
 * @returns {JSX.Element} The rendered back button.
 */
const BackButton = () => {
  const navigate = useNavigate()
  return (
    <IconButton onClick={() => navigate(-1)} aria-label="Back">
      <ArrowBackIcon />
    </IconButton>
  )
}
export default BackButton
