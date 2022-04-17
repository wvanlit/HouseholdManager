export async function post(endpoint: string, body: object) {
  return await fetch(`/api/${endpoint}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
}

export async function authenticatedFetch(
  input: RequestInfo,
  init: RequestInit | undefined,
  jwt: string
) {
  return await fetch(input, {
    headers: {
      Accept: "application/json, text/plain, */*",
      Authorization: `bearer ${jwt}`,
    },
    ...init,
  })
}
