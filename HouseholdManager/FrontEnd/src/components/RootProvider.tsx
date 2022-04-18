import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core"
import { ProvideAuth } from "hooks/useAuth"
import { ProvideRoute } from "hooks/useRoute"
import React, { useState } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { FCWithChildren } from "types/react"

const RootProvider: FCWithChildren<{}> = ({ children }) => {
  const queryClient = new QueryClient({})

  return (
    <MantineProvider>
      {/* @ts-ignore - Types not up to date yet with React 18 */}
      <QueryClientProvider client={queryClient}>
        <ProvideAuth>
          <ProvideRoute>{children}</ProvideRoute>
        </ProvideAuth>
      </QueryClientProvider>
    </MantineProvider>
  )
}

export default RootProvider
