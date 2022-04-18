import {
  Center,
  Divider,
  Stack,
  Title,
  Text,
  Group,
  Button,
  ScrollArea,
  TextInput,
  Table,
} from "@mantine/core"
import ErrorAlert from "components/ErrorAlert"
import Section from "components/Section"
import { RecipeList } from "data/Recipe"
import { useRecipeAPI } from "hooks/useRecipes"
import React, { FC, useState } from "react"
import RecipeView from "./RecipeView"

interface RecipeListEditorProps {
  list: RecipeList
}

const RecipeListEditor: FC<RecipeListEditorProps> = ({ list }) => {
  const areaHeight = "30vh"

  const [recipeName, setRecipeName] = useState("")
  const { addRecipeToList } = useRecipeAPI()

  return (
    <Section>
      <Stack spacing={8}>
        <Title order={4}>{list.name}</Title>
        <Divider />
        <ScrollArea
          type="auto"
          sx={{
            height: areaHeight,
          }}
        >
          {list.recipes.length > 0 ? (
            <Table>
              <thead>
                <tr>
                  <th>Edit</th>
                  <th>Name</th>
                  <th>Recipe</th>
                </tr>
              </thead>
              <tbody>
                {list.recipes.map(r => (
                  <RecipeView recipe={r} key={r.name} />
                ))}
              </tbody>
            </Table>
          ) : (
            <Stack sx={{ height: areaHeight }} align="center" justify="center">
              <Text sx={{ fontStyle: "italic" }}>No recipes added yet</Text>
            </Stack>
          )}
        </ScrollArea>

        <Divider />
        <Group position="right">
          <TextInput
            placeholder="Recipe Name"
            sx={{ flexGrow: 1 }}
            value={recipeName}
            onChange={e => setRecipeName(e.target.value)}
          />
          <Button
            onClick={() => {
              addRecipeToList.mutate({ recipe: recipeName, list })
              setRecipeName("")
            }}
            loading={addRecipeToList.isLoading}
          >
            Add Recipe
          </Button>
        </Group>
        <ErrorAlert error={addRecipeToList.error as Error} />
      </Stack>
    </Section>
  )
}

export default RecipeListEditor
