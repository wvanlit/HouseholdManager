import { useInterval } from "@mantine/hooks"
import { useState } from "react"
import { useQuery } from "react-query"

export function useServerStatus(refetchInterval: number = 10_000) {
  const [statusOK, setStatus] = useState(true)

  useQuery("serverStatus", () => fetch("/api/server/status"), {
    onSettled: async response => {
      if (!response) {
        setStatus(false)
        return
      }

      const text = await response.text()
      setStatus(text === "OK")
    },
    refetchInterval,
  })

  return statusOK
}
