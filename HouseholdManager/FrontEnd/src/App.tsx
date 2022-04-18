import React from "react"
import Layout from "./pages/Layout"
import AuthorisedRoute from "components/Auth/AuthorisedRoute"
import UserLogin from "pages/UserLogin"
import { ReactQueryDevtools } from "react-query/devtools"
import { useRoute } from "hooks/useRoute"
import Home from "pages/Home"
import Household from "pages/Household"
import Recipes from "pages/Recipes"

const routes: Record<string, React.ReactNode> = {
  Household: <Household />,
  Recipes: <Recipes />,
  Grocery_List_Generator: "list",
}

function App() {
  const { route } = useRoute()

  return (
    <Layout tabs={Object.keys(routes).map(r => r.replaceAll("_", " "))}>
      <AuthorisedRoute loginFallback={<UserLogin />}>
        {Object.keys(routes).includes(route) ? routes[route] : <Home />}
      </AuthorisedRoute>
      <ReactQueryDevtools />
    </Layout>
  )
}

export default App
