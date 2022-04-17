import { Code } from "@mantine/core"
import { useAuth } from "hooks/useAuth"
import { getHouseholdAPI } from "hooks/useHousehold"
import React from "react"
import { useQuery } from "react-query"
import { FCWithChildren } from "types/react"

const HouseholdContainer: FCWithChildren<{}> = ({}) => {
  const { user } = useAuth()
  const { getUserHouseholds } = getHouseholdAPI()

  const households = getUserHouseholds(user?.username!)

  return (
    <div>
      HouseholdContainer
      <Code block>{JSON.stringify(households.data)}</Code>
      <Code block>{(households.error as Error)?.message}</Code>
    </div>
  )
}

export default HouseholdContainer
