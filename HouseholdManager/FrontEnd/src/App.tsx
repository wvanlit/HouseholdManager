import React, { useEffect, useState } from "react"
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core"
import Layout from "./pages/Layout"
import { ProvideAuth } from "hooks/useAuth"
import AuthorisedRoute from "components/Auth/AuthorisedRoute"
import UserLogin from "pages/UserLogin"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { ProvideRoute, useRoute } from "hooks/useRoute"
import { useColorScheme } from "@mantine/hooks"
import RootProvider from "components/RootProvider"
import HouseholdContainer from "components/Household/HouseholdContainer"

const routes: Record<string, React.ReactNode> = {
  Household: <HouseholdContainer />,
  Recipes: "recipes",
  Task_List: "task list",
}

function App() {
  const { route } = useRoute()

  return (
    <Layout tabs={Object.keys(routes).map(r => r.replace("_", " "))}>
      <AuthorisedRoute loginFallback={<UserLogin />}>
        {Object.keys(routes).includes(route)
          ? routes[route]
          : "404: Page not Found " + route}
      </AuthorisedRoute>
      <ReactQueryDevtools />
    </Layout>
  )
}

export default App
