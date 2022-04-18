import { Box, Button, Group, TextInput } from "@mantine/core"
import Section from "components/Section"
import ErrorAlert from "components/ErrorAlert"
import { useAuth } from "hooks/useAuth"
import { useHouseholdAPI } from "hooks/useHousehold"
import React, { FC, useState } from "react"

const CreateHousehold: FC = () => {
  const [name, setName] = useState("")
  const { createHousehold } = useHouseholdAPI()
  const { user } = useAuth()

  return (
    <Section p={16}>
      <Group>
        <TextInput
          sx={{ flexGrow: 1 }}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Button
          onClick={() => {
            createHousehold.mutate({ name, usernames: [user!.username] })
            setName("")
          }}
        >
          Add New Household
        </Button>
      </Group>
      <ErrorAlert error={createHousehold.error as Error} />
    </Section>
  )
}

export default CreateHousehold
