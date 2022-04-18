import { Code, Container, Stack } from "@mantine/core"
import { useAuth } from "hooks/useAuth"
import { useHouseholdAPI } from "hooks/useHousehold"
import React from "react"
import { useQuery } from "react-query"
import { FCWithChildren } from "types/react"
import HouseholdList from "./HouseholdList"

const HouseholdContainer: FCWithChildren<{}> = ({}) => {
  const { user } = useAuth()
  const { getUserHouseholds } = useHouseholdAPI()

  const households = getUserHouseholds(user?.username!)

  return <HouseholdList households={households.data ?? []} />
}

export default HouseholdContainer
