import { Button, Group, Modal, Stack, TextInput } from "@mantine/core"
import ErrorAlert from "components/ErrorAlert"
import { Household } from "data/Household"
import { useHouseholdAPI } from "hooks/useHousehold"
import React, { FC, useState } from "react"

interface AddHouseholdMemberProps {
  household: Household
}

const AddHouseholdMember: FC<AddHouseholdMemberProps> = ({ household }) => {
  const { addUserToHousehold } = useHouseholdAPI()
  const [username, setUsername] = useState("")

  return (
    <>
      <Group position="left" px={24} pb={16}>
        <TextInput
          autoFocus={true}
          sx={{ flexGrow: 1 }}
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <Button
          onClick={() => {
            addUserToHousehold.mutate({ household, username })
            setUsername("")
          }}
          loading={addUserToHousehold.isLoading}
        >
          Add
        </Button>
      </Group>
      <ErrorAlert error={addUserToHousehold.error as Error} />
    </>
  )
}

export default AddHouseholdMember
