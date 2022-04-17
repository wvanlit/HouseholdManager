import { authenticatedFetch } from "api/http"
import { useQuery } from "react-query"
import { useAuth } from "./useAuth"

export const getHouseholdAPI = () => {
  const auth = useAuth()

  return {
    getUserHouseholds: (user: string) =>
      useQuery(`userHouseholds-${user}`, async () => {
        const response = await authenticatedFetch(
          `/api/household/user/${user}`,
          {},
          auth.JWT!
        )

        if (response.status == 401) {
          auth.logout()
        }

        if (!response.ok) {
          throw Error("Network error on request")
        }

        return response.json()
      }),
  }
}
