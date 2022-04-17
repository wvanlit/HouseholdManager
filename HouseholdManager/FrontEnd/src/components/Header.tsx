import {
  Container,
  createStyles,
  Group,
  Menu,
  Tabs,
  Title,
  Text,
  UnstyledButton,
} from "@mantine/core"
import React, { FC, useState } from "react"
import { ChevronDown } from "tabler-icons-react"
import ServerStatus from "./ServerStatus"

const useStyles = createStyles(theme => {
  const textColor =
    theme.colorScheme === "dark" ? theme.colors.gray[0] : theme.colors.dark[6]
  const primaryBg =
    theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0]
  const hoverBg =
    theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[1]
  const borderColor =
    theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]

  return {
    header: {
      paddingTop: theme.spacing.sm,
      paddingInline: theme.spacing.sm,
      marginBottom: 20,

      borderBottom: `2px solid ${borderColor}`,

      color: textColor,
      backgroundColor: primaryBg,
    },

    topSection: {
      marginBottom: theme.spacing.md,
    },

    title: {
      fontSize: "16px",

      [theme.fn.largerThan("xs")]: {
        fontSize: "24px",
      },
    },

    userMenu: {
      // [theme.fn.smallerThan("xs")]: {
      //   display: "none",
      // },
    },

    user: {
      color: textColor,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      transition: "background-color 100ms ease",

      "&:hover": {
        backgroundColor: hoverBg,
      },
    },

    userActive: {
      backgroundColor: primaryBg,
    },

    tabs: {},

    tabsList: {
      borderBottom: "0 !important",
    },

    tabControl: {
      color: `${textColor} !important`,
      border: `0px solid ${borderColor} !important`,

      "&:hover": {
        backgroundColor: hoverBg,
      },
    },

    tabControlActive: {
      color: `${textColor} !important`,
      fontWeight: 600,

      backgroundColor: theme.white,
      border: `2px solid ${borderColor} !important`,
      borderBottomWidth: `0px !important`,
      borderStartEndRadius: theme.radius.md,
      borderStartStartRadius: theme.radius.md,
    },
  }
})

interface MenuProps {
  username: string
  items: React.ReactNode
}

interface HeaderProps {
  menu: MenuProps
  tabs: string[]
}

const Header: FC<HeaderProps> = ({ tabs, menu }) => {
  const { classes, theme, cx } = useStyles()

  const [userMenuOpened, setUserMenuOpened] = useState(false)
  const [hamburgerMenuOpened, setHamburgerMenuOpened] = useState(false)

  return (
    <div className={classes.header}>
      <Container className={classes.topSection}>
        <Group position="apart">
          <Group spacing={6} align="center">
            <Title className={classes.title}>Household Manager</Title>
            <ServerStatus />
          </Group>

          <Menu
            size={260}
            placement="end"
            transition="pop-top-right"
            className={classes.userMenu}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            control={
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}>
                <Group spacing={4}>
                  <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                    {menu.username}
                  </Text>
                  <ChevronDown size={12} />
                </Group>
              </UnstyledButton>
            }>
            {menu.items}
          </Menu>
        </Group>
      </Container>

      <Container>
        {tabs.length > 0 ? (
          <Tabs
            classNames={{
              root: classes.tabs,
              tabsListWrapper: classes.tabsList,
              tabControl: classes.tabControl,
              tabActive: classes.tabControlActive,
            }}>
            {tabs.map(t => (
              <Tabs.Tab label={t} key={t} />
            ))}
          </Tabs>
        ) : undefined}
      </Container>
    </div>
  )
}

export default Header
