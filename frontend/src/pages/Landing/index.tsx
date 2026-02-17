import { useIntl } from "react-intl"

import PageLayout from "~/layouts/PageLayout"

import CredentialList from "./CredentialList"

const LandingPage = () => {
  const { formatMessage } = useIntl()

  return (
    <PageLayout documentTitle={formatMessage({ defaultMessage: "Dashboard", id: "pages.dashboard.title" })}>
      <CredentialList />
    </PageLayout>
  )
}

export default LandingPage
