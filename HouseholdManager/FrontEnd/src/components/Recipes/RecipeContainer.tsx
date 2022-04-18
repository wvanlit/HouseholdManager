import { Household } from "data/Household"
import React, { FC, useState } from "react"
import { Code, Container, Stack } from "@mantine/core"
import { useRecipeAPI } from "hooks/useRecipes"
import ErrorAlert from "components/ErrorAlert"
import Section from "components/Section"
import ChooseRecipeList from "./ChooseRecipeList"
import RecipeListSelector from "./RecipeListSelector"
import { RecipeList } from "data/Recipe"
import { useAuth } from "hooks/useAuth"
import { useHouseholdAPI } from "hooks/useHousehold"
import ChooseHousehold from "components/Household/ChooseHousehold"
import RecipeListEditor from "./RecipeListEditor"

interface RecipeContainerProps {}

const RecipeContainer: FC<RecipeContainerProps> = () => {
  const auth = useAuth()

  const { getUserHouseholds } = useHouseholdAPI()
  const { getRecipesFromHousehold } = useRecipeAPI()

  const [household, setHousehold] = useState<Household | undefined>(undefined)
  const [recipeList, setRecipeList] = useState<RecipeList | undefined>(
    undefined
  )

  const households = getUserHouseholds(auth.user!.username)

  return (
    <Stack spacing={32}>
      <Section>
        <ErrorAlert error={households?.error as Error} />

        <Stack>
          <ChooseHousehold
            current={household}
            setCurrent={setHousehold}
            options={households.data ?? []}
          />

          {household !== undefined ? (
            <RecipeListSelector
              selectedHousehold={household}
              selectedRecipeList={recipeList}
              setSelectedRecipeList={setRecipeList}
            />
          ) : undefined}
        </Stack>
      </Section>

      {recipeList !== undefined ? (
        <RecipeListEditor list={recipeList} />
      ) : undefined}
    </Stack>
  )
}
export default RecipeContainer
