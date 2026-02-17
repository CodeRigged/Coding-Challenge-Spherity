import { Button, ButtonProps } from "@mui/material"
import { Link } from "react-router-dom"

import { LinkComponent } from "~/types/common"

interface LinkButtonProps extends LinkComponent {
  label: string
}

/**
 * Renders a LinkButton component with the provided label, linkTo, and additional button properties.
 *
 * @param {string} label - The label to be displayed on the button.
 * @param {To} to - The destination link for the button.
 * @param {ButtonProps} buttonProps - Additional properties  from the button component.
 * @return {JSX.Element} The rendered LinkButton component.
 */
const LinkButton = ({ label, to, ...buttonProps }: LinkButtonProps & ButtonProps) => {
  return (
    <Button component={Link} to={to} {...buttonProps}>
      {label}
    </Button>
  )
}
export default LinkButton
