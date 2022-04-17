import { AppShell, Container, createStyles, Menu } from "@mantine/core"
import { useAuth } from "hooks/useAuth"
import React, { FC } from "react"
import { Login, Logout, Settings } from "tabler-icons-react"
import { FCWithChildren } from "types/react"
import Header from "../components/Header"

interface LayoutProps {
  tabs: string[]
}

const Layout: FCWithChildren<LayoutProps> = ({ tabs, children }) => {
  const auth = useAuth()

  return (
    <AppShell
      header={
        <Header
          tabs={auth.user !== undefined ? tabs : []}
          menu={{
            username: auth.user?.username ?? "Guest",
            items: (
              <>
                <Menu.Label>Account</Menu.Label>

                {auth.user !== undefined ? (
                  <>
                    <Menu.Item
                      icon={<Logout size={14} />}
                      onClick={() => auth.logout()}>
                      Log Out
                    </Menu.Item>
                  </>
                ) : (
                  <Menu.Item icon={<Login size={14} />}>Log In</Menu.Item>
                )}
              </>
            ),
          }}
        />
      }>
      <Container>{children}</Container>
    </AppShell>
  )
}

export default Layout
