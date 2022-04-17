import { useMantineTheme, ColorSwatch } from "@mantine/core"
import { useServerStatus } from "hooks/useServerStatus"
import React, { useEffect } from "react"

const ServerStatus = () => {
  const statusOK = useServerStatus()
  const theme = useMantineTheme()

  return (
    <ColorSwatch
      color={statusOK ? theme.colors.green[6] : theme.colors.red[6]}
      size={8}
      title={statusOK ? "Connection available" : "No connection to server"}
    />
  )
}

export default ServerStatus
