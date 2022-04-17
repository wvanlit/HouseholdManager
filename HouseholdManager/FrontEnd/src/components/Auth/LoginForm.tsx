import { Box, Button, Group, Stack, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useAuth } from "hooks/useAuth"

const LoginForm = () => {
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  })

  const { login } = useAuth()

  return (
    <Box sx={{ width: "100%", maxWidth: "55ch", marginInline: "auto" }}>
      <form
        onSubmit={form.onSubmit(values => {
          login.mutate(values)
        })}>
        <Stack align={"right"} spacing={4}>
          <TextInput
            required
            label="Username"
            placeholder="You!"
            {...form.getInputProps("username")}
          />
          <TextInput
            required
            label="Password"
            placeholder="hunter2"
            type="password"
            {...form.getInputProps("password")}
          />

          <Group position="right" mt="md">
            <Button type="submit" loading={login.isLoading}>
              Submit
            </Button>
          </Group>
        </Stack>
      </form>
    </Box>
  )
}

export default LoginForm
