import { SvgIconProps } from "@mui/material"
import IconButton, { IconButtonProps } from "@mui/material/IconButton"
import { ComponentType } from "react"
import { Link } from "react-router-dom"

import { LinkComponent } from "~/types/common"

interface LinkIconButtonProps extends LinkComponent {
  Icon: ComponentType<SvgIconProps>
}

/**
 * Renders a LinkIconButton component.
 *
 * @param {LinkIconButtonProp} Icon - The Icon component to display.
 * @param {To} to - The link destination.
 * @param {IconButtonProps} iconButtonProps - Additional properties from the icon button component.
 * @return {ReactNode} The rendered LinkIconButton component.
 */
const LinkIconButton = ({ Icon, to, ...iconButtonProps }: LinkIconButtonProps & IconButtonProps) => {
  return (
    <IconButton component={Link} to={to} {...iconButtonProps}>
      <Icon />
    </IconButton>
  )
}
export default LinkIconButton
