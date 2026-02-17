import { createBrowserRouter } from "react-router-dom"

import AppLayout from "~/layouts/AppLayout"
import LandingPage from "~/pages/Landing"
import LogoutPage from "~/pages/LogoutPage"
import ProfilePage from "~/pages/Profile"
import SettingsPage from "~/pages/Settings"

const router = createBrowserRouter([
  {
    children: [
      {
        element: <LandingPage />,
        path: "/",
      },
      {
        element: <ProfilePage />,
        path: "/profile",
      },
      {
        element: <SettingsPage />,
        path: "/settings",
      },
      {
        element: <LogoutPage />,
        path: "/logout",
      },
      { element: <div>404 Not Found</div>, path: "*" },
    ],
    element: <AppLayout />,
    path: "/",
  },
])

export default router
