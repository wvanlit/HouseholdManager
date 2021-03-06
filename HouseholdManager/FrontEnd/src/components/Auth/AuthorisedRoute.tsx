import { Container } from "@mantine/core"
import { useAuth } from "hooks/useAuth"
import React, { FC } from "react"
import { FCWithChildren } from "types/react"

const AuthorisedRoute: FCWithChildren<{
  loginFallback: React.ReactNode
}> = ({ children, loginFallback }) => {
  const auth = useAuth()

  return (
    <Container>
      {auth.JWT !== undefined && auth.user !== undefined
        ? children
        : loginFallback}
    </Container>
  )
}

export default AuthorisedRoute
