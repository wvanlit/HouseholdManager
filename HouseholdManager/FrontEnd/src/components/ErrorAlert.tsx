import { Alert, Code } from "@mantine/core"
import React, { FC } from "react"

const ErrorAlert: FC<{ error: Error | null; title?: string }> = ({
  error,
  title,
}) => {
  return error == null ? (
    <></>
  ) : (
    <Alert
      my={16}
      variant="filled"
      color="red"
      sx={{ overflow: "auto", fontWeight: "bolder" }}
      title={title}
      children={error?.message ?? "Server Error"}
    />
  )
}

export default ErrorAlert
