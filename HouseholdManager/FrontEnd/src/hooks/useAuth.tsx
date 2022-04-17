import { useLocalStorage } from "@mantine/hooks"
import { post } from "api/http"
import { User } from "data/User"
import { decodeJwt } from "jose"
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react"
import { useMutation, UseMutationResult } from "react-query"

export interface AuthContext {
  user: User | undefined
  JWT: string | undefined

  register: UseMutationResult<Response, unknown, LoginParameters, unknown>
  login: UseMutationResult<Response, unknown, LoginParameters, unknown>
  logout: () => void
}

interface LoginParameters {
  username: string
  password: string
}

const authContext = createContext<AuthContext>({} as AuthContext)

export function useProvideAuth(): AuthContext {
  const [user, setUser] = useLocalStorage<User | undefined>({
    key: "user",
    defaultValue: undefined,
  })

  const [JWT, setJWT] = useLocalStorage<string | undefined>({
    key: "JWT",
    defaultValue: undefined,
  })

  const login = useMutation(
    (input: LoginParameters) => post("auth/login", input),
    {
      mutationKey: "userLogIn",
      onSuccess: async response => {
        if (response.status !== 200) throw new Error(await response.text())

        const jwt = await response.text()

        const claims = decodeJwt(jwt)

        const findClaim = (claim: string): string => {
          const keys = Object.keys(claims)
          const claimKey = keys.find(key => key.includes(`claims/${claim}`))
          if (claimKey === undefined)
            throw new Error(
              `Claim '${claim}' not available. Cannot log in user!`
            )

          return (claims as Record<string, string>)[claimKey]
        }

        setJWT(jwt)

        setUser({
          username: findClaim("name"),
          role: findClaim("role"),
        })

        console.log(user, JWT)
      },
    }
  )

  const register = useMutation(
    (input: LoginParameters) => post("auth/register", input),
    {
      mutationKey: "userRegister",
      onSuccess: async (response, input) => {
        if (response.status !== 200) throw new Error(await response.text())

        await login.mutateAsync(input)
      },
    }
  )

  const logout = () => {
    setUser(undefined)
    setJWT(undefined)
  }

  return {
    user,
    JWT,
    register,
    login,
    logout,
  }
}

export const ProvideAuth: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export function useAuth() {
  return useContext(authContext)
}
