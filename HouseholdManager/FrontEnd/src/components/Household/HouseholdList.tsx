import {
  Box,
  Button,
  Center,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core"
import ErrorAlert from "components/ErrorAlert"
import { Household } from "data/Household"
import { useHouseholdAPI } from "hooks/useHousehold"
import React, { FC } from "react"
import CreateHousehold from "./CreateHousehold"
import HouseholdView from "./HouseholdView"

interface HouseholdListProps {
  households: Household[]
}

const HouseholdList: FC<HouseholdListProps> = ({ households }) => {
  return (
    <Stack>
      <CreateHousehold />

      {households.length > 0 ? (
        households.map(h => <HouseholdView household={h} key={h.id} />)
      ) : (
        <Center my={32}>
          <Text sx={{ fontStyle: "italic" }}>No households available</Text>
        </Center>
      )}
    </Stack>
  )
}

export default HouseholdList
