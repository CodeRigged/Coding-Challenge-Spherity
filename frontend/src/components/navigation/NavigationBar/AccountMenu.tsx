import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import LogoutIcon from "@mui/icons-material/Logout"
import SettingsIcon from "@mui/icons-material/Settings"
import { Divider, IconButton } from "@mui/material"
import { FormattedMessage } from "react-intl"

import AppMenu from "../Menu"
import { MenuListItem } from "../Menu/MenuItems"

/**
 * Renders an account menu component.
 *
 * @todo Change to desired Menu Items
 *
 * @return {JSX.Element} The rendered account menu component.
 */
const AccountMenu = () => {
  return (
    <AppMenu
      Activator={({ onClick }) => (
        <IconButton onClick={onClick} sx={{ ml: 2 }} aria-haspopup="true">
          <AccountCircleIcon />
        </IconButton>
      )}
      items={[
        <MenuListItem
          icon={<AccountCircleIcon />}
          text={<FormattedMessage id="pages.profile.title" defaultMessage="Profile" />}
          to="/profile"
        />,
        <Divider />,
        <MenuListItem
          dense
          icon={<SettingsIcon fontSize="small" />}
          text={<FormattedMessage id="pages.settings.title" defaultMessage="Settings" />}
          to="/settings"
        />,
        <MenuListItem
          dense
          icon={<LogoutIcon fontSize="small" />}
          text={<FormattedMessage id="pages.logout.title" defaultMessage="Logout" />}
          to="/logout"
        />,
      ]}
    />
  )
}
export default AccountMenu
