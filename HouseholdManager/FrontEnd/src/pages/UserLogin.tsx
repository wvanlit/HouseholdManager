import {
  Container,
  SegmentedControl,
  Stack,
  useMantineTheme,
} from "@mantine/core"
import LoginForm from "components/Auth/LoginForm"
import RegistrationForm from "components/Auth/RegistrationForm"
import { useState } from "react"

const UserLogin = () => {
  const [page, setPage] = useState<string>("login")
  const theme = useMantineTheme()

  return (
    <Container>
      <Stack>
        <SegmentedControl
          data={[
            { label: "Log In", value: "login" },
            { label: "Register", value: "registration" },
          ]}
          color={theme.primaryColor}
          value={page}
          onChange={value => setPage(value)}
        />
        {page === "registration" ? <RegistrationForm /> : <LoginForm />}
      </Stack>
    </Container>
  )
}

export default UserLogin
