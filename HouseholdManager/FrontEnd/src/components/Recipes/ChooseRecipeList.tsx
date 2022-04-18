import { Button, Group, Select, Stack, TextInput } from "@mantine/core"
import Section from "components/Section"
import { Household } from "data/Household"
import { RecipeList } from "data/Recipe"
import { useAuth } from "hooks/useAuth"
import { useHouseholdAPI } from "hooks/useHousehold"
import { useRecipeAPI } from "hooks/useRecipes"
import React, { FC, useEffect, useState } from "react"

interface ChooseRecipeListProps {
  household: Household | undefined
  current: RecipeList | undefined
  setCurrent: (recipeList: RecipeList | undefined) => void
  options: RecipeList[]
}

const idToString = (r: RecipeList | undefined) => r?.id!.toString()

const ChooseRecipeList: FC<ChooseRecipeListProps> = ({
  household,
  current,
  setCurrent,
  options,
}) => {
  const [listName, setListName] = useState("")
  const { createRecipeListForHousehold } = useRecipeAPI()

  return (
    <Stack>
      <Select
        value={idToString(current)}
        nothingFound={"Add a list to get started!"}
        placeholder={"Select a recipe list"}
        onChange={value => {
          setCurrent(options.find(r => idToString(r) === value) ?? current)
        }}
        data={
          options.map(h => ({
            value: h.id!.toString(),
            label: h.name,
          })) ?? []
        }
      />
      <Group>
        <TextInput
          sx={{ flexGrow: 1 }}
          value={listName}
          onChange={e => setListName(e.target.value)}
        />
        <Button
          disabled={household === undefined}
          onClick={() => {
            createRecipeListForHousehold.mutate({
              name: listName,
              household: household!,
            })
            setListName("")
          }}
        >
          Add List
        </Button>
      </Group>
    </Stack>
  )
}

export default ChooseRecipeList
