import React, { FC } from "react"

export type FCWithChildren<T> = FC<T & { children?: React.ReactNode }>
