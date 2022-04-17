import { useEffect, useState } from "react"
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

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light")
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

  const queryClient = new QueryClient({})

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }}>
        {/* @ts-ignore - Types not up to date yet with React 18 */}
        <QueryClientProvider client={queryClient}>
          <ProvideAuth>
            <Layout>
              <AuthorisedRoute loginFallback={<UserLogin />}>
                Authorised!
              </AuthorisedRoute>
              <ReactQueryDevtools />
            </Layout>
          </ProvideAuth>
        </QueryClientProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
