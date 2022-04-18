import { authenticatedFetch } from "api/http"
import { Household } from "data/Household"
import { RecipeList } from "data/Recipe"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useAuth } from "./useAuth"

export const useRecipeAPI = () => {
  const auth = useAuth()
  const queryClient = useQueryClient()

  const handleCommonErrors = async (response: Response) => {
    if ([400, 401, 403].includes(response.status)) {
      throw Error((await response.text()) ?? response.statusText)
    }

    if (response.status == 401) {
      auth.logout()
      throw Error("Login expired / Unauthorized")
    }

    if (!response.ok) {
      throw Error("Network error on request: " + response.statusText)
    }
  }

  return {
    getRecipesFromHousehold: (householdId: number) =>
      useQuery(`householdRecipes`, async (): Promise<RecipeList[]> => {
        if (householdId === undefined) return []

        const response = await authenticatedFetch(
          `/api/recipe/household/${householdId}`,
          {},
          auth.JWT!
        )

        await handleCommonErrors(response)

        return response.json()
      }),

    createRecipeListForHousehold: useMutation(
      async ({ household, name }: { household: Household; name: string }) => {
        const response = await authenticatedFetch(
          `/api/recipe/list/${household.id!}/${name}`,
          { method: "POST" },
          auth.JWT!
        )

        await handleCommonErrors(response)

        queryClient.invalidateQueries("householdRecipes")

        return
      },
      {
        mutationKey: `addListToHousehold`,
      }
    ),

    addRecipeToList: useMutation(
      async ({ recipe, list }: { recipe: string; list: RecipeList }) => {
        const response = await authenticatedFetch(
          `/api/recipe/recipe?listId=${list.id}`,
          {
            method: "POST",
            body: JSON.stringify({
              name: recipe,
              ingredients: [],
            }),
            headers: {
              "Content-Type": "application/json",
            },
          },
          auth.JWT!
        )

        await handleCommonErrors(response)


        await queryClient.fetchQuery("householdRecipes")

        return
      },
      {
        mutationKey: "addRecipeToList",
      }
    ),
  }
}
