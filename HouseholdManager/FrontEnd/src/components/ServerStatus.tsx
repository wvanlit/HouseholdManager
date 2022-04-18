import {
  useMantineTheme,
  ColorSwatch,
  Loader,
  Group,
  Stack,
} from "@mantine/core"
import { useInterval } from "@mantine/hooks"
import { useServerStatus } from "hooks/useServerStatus"
import React, { useEffect, useState } from "react"
import { useQueryClient } from "react-query"

const ServerStatus = () => {
  const queryClient = useQueryClient()
  const [requestBusy, setRequestBusy] = useState(false)

  const { start, stop } = useInterval(() => {
    setRequestBusy(queryClient.isFetching() > 0 || queryClient.isMutating() > 0)
  }, 100)

  useEffect(() => {
    start()
    return stop
  }, [])

  const statusOK = useServerStatus()
  const theme = useMantineTheme()

  return (
    <Stack align="center" justify="flex-start" spacing={4}>
      <ColorSwatch
        color={statusOK ? theme.colors.green[6] : theme.colors.red[6]}
        size={8}
        title={statusOK ? "Connection available" : "No connection to server"}
      />
      <Loader
        size={10}
        sx={{
          opacity: requestBusy ? 1 : 0,
        }}
      />
    </Stack>
  )
}

export default ServerStatus
