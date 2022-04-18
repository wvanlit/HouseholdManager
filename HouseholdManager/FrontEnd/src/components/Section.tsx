import { Box, BoxProps, DefaultProps } from "@mantine/core"
import React from "react"
import { FCWithChildren } from "types/react"

const Section: FCWithChildren<Partial<DefaultProps>> = ({
  children,
  ...props
}) => {
  return (
    <Box
      p={16}
      sx={theme => ({
        border: `1px solid ${theme.colors.gray[2]}`,
        borderRadius: theme.radius.md,

        boxShadow: theme.shadows.sm,
      })}
      {...props}
    >
      {children}
    </Box>
  )
}

export default Section
