import { Stack } from "@mantine/core"
import ChooseHousehold from "components/Household/ChooseHousehold"
import { Household } from "data/Household"
import { RecipeList } from "data/Recipe"
import { useRecipeAPI } from "hooks/useRecipes"
import React, { FC, useEffect, useState } from "react"
import { useQueryClient } from "react-query"
import ChooseRecipeList from "./ChooseRecipeList"

interface RecipeListEditorProps {
  selectedHousehold: Household

  selectedRecipeList: RecipeList | undefined
  setSelectedRecipeList: (list: RecipeList | undefined) => void
}

const RecipeListSelector: FC<RecipeListEditorProps> = ({
  selectedHousehold,
  selectedRecipeList,

  setSelectedRecipeList,
}) => {
  const { getRecipesFromHousehold } = useRecipeAPI()

  const recipeResult = getRecipesFromHousehold(selectedHousehold.id!)

  useEffect(() => {
    setSelectedRecipeList(undefined)
    recipeResult.refetch()
  }, [selectedHousehold])

  useEffect(() => {
    const list = recipeResult.data
    if (list === undefined) return

    setSelectedRecipeList(list.find(r => r.id === selectedRecipeList?.id))
  }, [recipeResult.data])

  return (
    <ChooseRecipeList
      household={selectedHousehold}
      current={selectedRecipeList}
      setCurrent={setSelectedRecipeList}
      options={recipeResult.isFetching ? [] : recipeResult.data ?? []}
    />
  )
}

export default RecipeListSelector
