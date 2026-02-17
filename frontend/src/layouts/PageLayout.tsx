import { Typography } from "@mui/material"

import { ChildComponent } from "~/types/common"
import useDocumentTitle from "~/utils/hooks/useDocumentTitle"

interface PageLayoutProps extends ChildComponent {
  documentTitle: string
}
/**
 * PageLayout component that renders a page with a title and content.
 *
 * @param {PageLayoutProps} props - The props object containing the document title and the children components.
 * @param {string} props.documentTitle - The title of the page to be rendered.
 * @param {ReactNode} props.children - The children components to be rendered.
 * @return {JSX.Element} The rendered page layout.
 */
const PageLayout = ({ children, documentTitle }: PageLayoutProps) => {
  useDocumentTitle(documentTitle)
  return (
    <div className="container" data-testid="app-main-container">
      <Typography variant="h4">{documentTitle}</Typography>
      {children}
    </div>
  )
}
export default PageLayout
