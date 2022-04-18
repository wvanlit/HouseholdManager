import { authenticatedFetch } from "api/http"
import { Household } from "data/Household"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useAuth } from "./useAuth"

export const useHouseholdAPI = () => {
  const auth = useAuth()
  const queryClient = useQueryClient()

  const handleCommonErrors = async (response: Response) => {
    if (response.status === 403 || response.status === 404) {
      throw Error(await response.text())
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
    createHousehold: useMutation(
      async (body: { name: string; usernames: string[] }) => {
        const response = await authenticatedFetch(
          `/api/household/create`,
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          },
          auth.JWT!
        )

        await handleCommonErrors(response)

        queryClient.invalidateQueries("userHouseholds")

        return response.json()
      },
      {
        mutationKey: `createHousehold`,
      }
    ),

    deleteHousehold: useMutation(
      async ({ id }: { id: number }) => {
        const response = await authenticatedFetch(
          `/api/household/${id}`,
          {
            method: "DELETE",
          },
          auth.JWT!
        )

        await handleCommonErrors(response)

        queryClient.invalidateQueries("userHouseholds")

        return
      },
      {
        mutationKey: `deleteHousehold`,
      }
    ),

    getUserHouseholds: (user: string) =>
      useQuery(`userHouseholds`, async (): Promise<Household[]> => {
        const response = await authenticatedFetch(
          `/api/household/user/${user}`,
          {},
          auth.JWT!
        )

        await handleCommonErrors(response)

        return response.json()
      }),

    addUserToHousehold: useMutation(
      async ({
        household,
        username,
      }: {
        household: Household
        username: string
      }) => {
        const response = await authenticatedFetch(
          `/api/household/${household.id!}/add/${username}`,
          { method: "POST" },
          auth.JWT!
        )

        await handleCommonErrors(response)

        queryClient.invalidateQueries("userHouseholds")

        return
      },
      {
        mutationKey: `addUserToHousehold`,
      }
    ),

    deleteUserFromHousehold: useMutation(
      async ({
        household,
        username,
      }: {
        household: Household
        username: string
      }) => {
        const response = await authenticatedFetch(
          `/api/household/${household.id!}/remove/${username}`,
          { method: "DELETE" },
          auth.JWT!
        )

        await handleCommonErrors(response)

        queryClient.invalidateQueries("userHouseholds")

        return
      },
      {
        mutationKey: `removeUserFromHousehold`,
      }
    ),
  }
}
