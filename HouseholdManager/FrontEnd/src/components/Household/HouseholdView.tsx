import {
  ActionIcon,
  Button,
  Collapse,
  Divider,
  Group,
  List,
  ListItemProps,
  Loader,
  ThemeIcon,
  Title,
  useMantineTheme,
} from "@mantine/core"
import { useHover } from "@mantine/hooks"
import Section from "components/Section"
import ErrorAlert from "components/ErrorAlert"
import { Household } from "data/Household"
import { useAuth } from "hooks/useAuth"
import { useHouseholdAPI } from "hooks/useHousehold"
import { FC, useState } from "react"
import { ChevronUp, Trash, User } from "tabler-icons-react"
import AddHouseholdMember from "./AddHouseholdMember"

interface HouseholdViewProps {
  household: Household
}

interface HouseholdMemberProps {
  household: Household
  username: string
}

const DeletableUserIcon: FC<{
  enabled: boolean
  loading: boolean
  onClick: () => void
}> = ({ enabled, loading, onClick }) => {
  const { hovered, ref } = useHover()
  const theme = useMantineTheme()

  return (
    <ThemeIcon
      ref={ref}
      p={4}
      radius="lg"
      color={enabled && hovered ? "red" : theme.primaryColor}
      sx={{
        cursor: enabled && hovered ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      {loading ? <Loader /> : enabled && hovered ? <Trash /> : <User />}
    </ThemeIcon>
  )
}

const HouseholdMember: FC<HouseholdMemberProps & Partial<ListItemProps>> = ({
  household,
  username,
  ...props
}) => {
  const auth = useAuth()
  const { deleteUserFromHousehold } = useHouseholdAPI()
  return (
    <List.Item
      {...props}
      icon={
        <DeletableUserIcon
          enabled={username !== auth.user?.username}
          loading={deleteUserFromHousehold.isLoading}
          onClick={() => {
            if (deleteUserFromHousehold.isLoading) return

            deleteUserFromHousehold.mutate({ household, username })
          }}
        />
      }
    >
      {username}
    </List.Item>
  )
}

const HouseholdView: FC<HouseholdViewProps> = ({ household }) => {
  const [opened, setOpen] = useState(false)
  const [showAddUser, setShowAddUser] = useState(false)

  const { deleteHousehold } = useHouseholdAPI()

  return (
    <Section p={16}>
      <Group position="apart">
        <Title order={3} pb={8}>
          {household.name}
        </Title>
        <ActionIcon
          onClick={() => setOpen(!opened)}
          sx={{
            transition: "rotate .25s ease",
            rotate: opened ? "0deg" : "180deg",
          }}
        >
          <ChevronUp />
        </ActionIcon>
      </Group>
      <Collapse in={opened} pl={16}>
        <Divider pt={8} />

        <Group position="apart" align={"baseline"}>
          <Title order={5}>Members</Title>
          <Button
            size="sm"
            variant="subtle"
            compact
            onClick={() => setShowAddUser(!showAddUser)}
          >
            {showAddUser ? "Done" : "Add users"}
          </Button>
        </Group>

        <List>
          {household.usernames.map(name => (
            <HouseholdMember
              p={8}
              username={name}
              household={household}
              key={name}
            />
          ))}
        </List>
        {showAddUser ? <AddHouseholdMember household={household} /> : undefined}

        <Divider pt={8} />

        <Title order={5}>Actions</Title>

        <Group position="apart">
          <Button
            color="red"
            leftIcon={<Trash size={16} />}
            size="sm"
            variant="subtle"
            compact
            // onClick={() => deleteHousehold.mutate({ id: household.id! })}
            loading={deleteHousehold.isLoading}
          >
            Delete
          </Button>
        </Group>
        <ErrorAlert error={deleteHousehold.error as Error} />
      </Collapse>
    </Section>
  )
}

export default HouseholdView
