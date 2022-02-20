export async function get<ResponseData>(url: string): Promise<ResponseData> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`API error, status: ${response.status}, method: GET, url: ${url}`)
  }

  return await (response.json() as Promise<ResponseData>)
}

export async function post<RequestData, ResponseData>(url: string, data: RequestData): Promise<ResponseData> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`API error, status: ${response.status}, method: POST, url: ${url}`)
  }

  return await (response.json() as Promise<ResponseData>)
}

export async function remove(url: string): Promise<Response> {
  const response = await fetch(url, { method: 'DELETE' })

  if (!response.ok) {
    throw new Error(`API error, status: ${response.status}, method: DELETE, url: ${url}`)
  }

  return response
}
