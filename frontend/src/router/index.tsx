import { createBrowserRouter } from "react-router-dom"
import { CredentialRoutes, LandingRoutes } from "router/routes"

import AppLayout from "~/layouts/AppLayout"
import CredentialPage from "~/pages/Credential/Credential"
import CredentialIssuerFormPage from "~/pages/Credential/CredentialIssuerForm"
import CredentialsOverviewPage from "~/pages/Credential/CredentialsOverview"
import LandingPage from "~/pages/Landing"
import LogoutPage from "~/pages/LogoutPage"
import ProfilePage from "~/pages/Profile"
import SettingsPage from "~/pages/Settings"

const router = createBrowserRouter([
  {
    children: [
      { element: <LandingPage />, path: LandingRoutes.ROOT },
      { element: <ProfilePage />, path: LandingRoutes.PROFILE },
      { element: <SettingsPage />, path: LandingRoutes.SETTINGS },
      { element: <LogoutPage />, path: LandingRoutes.LOGOUT },
      { element: <div>404 Not Found</div>, path: "*" },
    ],
    element: <AppLayout />,
    path: LandingRoutes.ROOT,
  },
  {
    children: [
      { element: <CredentialsOverviewPage />, path: "" },
      { element: <CredentialIssuerFormPage />, path: CredentialRoutes.NEW },
      { element: <CredentialPage />, path: CredentialRoutes.SINGLE },
    ],
    element: <AppLayout />,
    path: CredentialRoutes.OVERVIEW,
  },
])

export default router
