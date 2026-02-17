import { Outlet } from "react-router-dom"

import ErrorAlert from "~/components/feedback/alerts/ErrorAlert"
import LoadingOverlay from "~/components/feedback/LoadingOverlay"
import NavigationBar from "~/components/navigation/NavigationBar"

/**
 * Main application layout component.
 *
 * Includes the loading overlay, navigation bar, error alert, and renders the current route.
 *
 * @todo Update the navigation bar to include desired children and links.
 *
 * @returns {JSX.Element} The main layout structure.
 */
const AppLayout = () => (
  <>
    <LoadingOverlay />
    <NavigationBar />
    <ErrorAlert />
    <Outlet />
  </>
)

export default AppLayout
