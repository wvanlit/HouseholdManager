import { Select } from "@mantine/core"
import { Household } from "data/Household"
import React, { FC, useEffect } from "react"

interface ChooseHouseholdProps {
  current: Household | undefined
  setCurrent: (household: Household | undefined) => void
  options: Household[]
}

const idToString = (h: Household | undefined) => h?.id!.toString()

const ChooseHousehold: FC<ChooseHouseholdProps> = ({
  current,
  setCurrent,
  options,
}) => {
  useEffect(() => {
    if (current === undefined) {
      setCurrent(options.at(0))
    } else {
      setCurrent(options.find(r => r.id === current?.id))
    }
  }, [options])

  return (
    <Select
      value={idToString(current) ?? idToString(options.at(0))}
      nothingFound={"Create a household to get started"}
      placeholder={"Pick a household"}
      onChange={value => {
        setCurrent(options.find(h => idToString(h) === value) ?? current)
      }}
      data={
        options.map(h => ({
          value: h.id!.toString(),
          label: h.name,
        })) ?? []
      }
    />
  )
}

export default ChooseHousehold
