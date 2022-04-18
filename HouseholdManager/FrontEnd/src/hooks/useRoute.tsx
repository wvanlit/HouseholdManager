import { useHash } from "@mantine/hooks"
import { createContext, useContext, useEffect, useState } from "react"
import { FCWithChildren } from "types/react"

interface Route {
  route: string
  setRoute: (route: string) => void
}

const cleanHash = (hash: string) => hash.replace("#", "")

const routeContext = createContext<Route>({} as Route)

export const useProvideRoute = (): Route => {
  const [hash, setHash] = useHash()
  const [route, setRoute] = useState(cleanHash(hash))

  useEffect(() => {
    setRoute(cleanHash(hash))
  }, [hash])

  return {
    route: route,
    setRoute: route => {
      setHash(route.replaceAll(" ", "_"))
    },
  }
}

export const useRoute = () => {
  return useContext(routeContext)
}

export const ProvideRoute: FCWithChildren<{}> = ({ children }) => {
  const route = useProvideRoute()
  return <routeContext.Provider value={route}>{children}</routeContext.Provider>
}
