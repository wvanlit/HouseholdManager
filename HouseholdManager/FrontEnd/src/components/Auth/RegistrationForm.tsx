import {
  Alert,
  Box,
  Button,
  Code,
  Divider,
  Group,
  Stack,
  TextInput,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { useAuth } from "hooks/useAuth"
import React, { useState } from "react"
import { useMutation, useQueryClient } from "react-query"

const RegistrationForm = () => {
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      passwordRepeated: "",
    },

    validate: {
      username: value =>
        value.length >= 4 ? null : "Username should be at least 4 characters",
      password: value =>
        value.length >= 6 ? null : "Password should be at least 6 characters",
      passwordRepeated: (value, form) =>
        value === form.password ? null : "Password do not match",
    },
  })

  const { register } = useAuth()

  return (
    <>
      {register.error === null ? undefined : (
        <Alert
          color="red"
          variant="filled"
          sx={{ overflow: "auto" }}
          title="Error on registering user"
          children={<Code block>{(register.error as Error).message}</Code>}
        />
      )}
      <Box sx={{ width: "100%", maxWidth: "55ch", marginInline: "auto" }}>
        <form
          onSubmit={form.onSubmit(values => {
            register.mutate(values)
          })}>
          <Stack align={"right"} spacing={4}>
            <Divider label="Account Information" labelPosition="center" />
            <TextInput
              required
              label="Username"
              placeholder="You!"
              {...form.getInputProps("username")}
            />
            <Divider label="Password" labelPosition="center" />
            <TextInput
              required
              label="Password"
              placeholder="hunter2"
              type="password"
              {...form.getInputProps("password")}
              onBlur={() => {
                form.validateField("password")
              }}
            />
            <TextInput
              required
              label="Confirm Password"
              placeholder="hunter2"
              type="password"
              {...form.getInputProps("passwordRepeated")}
              onBlur={() => {
                form.validateField("passwordRepeated")
              }}
            />

            <Group position="right" mt="md">
              <Button type="submit" loading={register.isLoading}>
                Submit
              </Button>
            </Group>
          </Stack>
        </form>
      </Box>
    </>
  )
}

export default RegistrationForm
