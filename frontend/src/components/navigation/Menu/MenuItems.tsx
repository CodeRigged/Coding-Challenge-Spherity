import { ListItemIcon, MenuItem, MenuItemProps } from "@mui/material"
import { ReactElement, ReactNode } from "react"
import { Link, To } from "react-router-dom"

type ItemProps = {
  icon?: ReactNode
  props?: MenuItemProps
  text: string | ReactNode
  to?: To
}

/**
 * Renders a menu list item with an icon, text, and link.
 *
 * @param {ItemProps} icon - The icon to display.
 * @param {ItemProps} text - The text to display.
 * @param {ItemProps} to - The link destination.
 * @return {ReactElement<typeof MenuItem>} The rendered menu list item.
 */
export const MenuListItem = ({
  icon,
  text,
  to,
  ...props
}: ItemProps & MenuItemProps): ReactElement<typeof MenuItem> => (
  <MenuItem component={Link} to={to} {...props}>
    {icon && <ListItemIcon>{icon}</ListItemIcon>}
    {text}
  </MenuItem>
)
