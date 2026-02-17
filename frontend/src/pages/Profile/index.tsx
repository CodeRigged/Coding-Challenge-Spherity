import { useIntl } from "react-intl"

import PageLayout from "~/layouts/PageLayout"

const ProfilePage = () => {
  const { formatMessage } = useIntl()
  return (
    <PageLayout documentTitle={formatMessage({ defaultMessage: "Profile", id: "pages.profile.title" })}>
      TODO
    </PageLayout>
  )
}
export default ProfilePage
