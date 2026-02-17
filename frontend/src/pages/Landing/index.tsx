import { useIntl } from "react-intl"

import PageLayout from "~/layouts/PageLayout"

import TodoList from "./TodoList"

const LandingPage = () => {
  const { formatMessage } = useIntl()

  return (
    <PageLayout documentTitle={formatMessage({ defaultMessage: "Landing Page", id: "pages.landing.title" })}>
      <TodoList />
    </PageLayout>
  )
}
export default LandingPage
