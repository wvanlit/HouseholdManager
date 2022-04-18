import { ActionIcon, Group, Text } from "@mantine/core"
import { Recipe } from "data/Recipe"
import React, { FC } from "react"
import { Edit } from "tabler-icons-react"

interface RecipeViewProps {
  recipe: Recipe
}

const RecipeView: FC<RecipeViewProps> = ({ recipe }) => {
  return (
    <tr>
      <td>
        <ActionIcon>
          <Edit />
        </ActionIcon>
      </td>
      <td>
        <Text>{recipe.name}</Text>
      </td>
      <td>
        {recipe.recipeLink === "" ? (
          <Text />
        ) : (
          <a href={recipe.recipeLink} target="_blank">
            link
          </a>
        )}
      </td>
    </tr>
  )
}

export default RecipeView
