export async function get<ResponseData>(url: string): Promise<ResponseData> {
  const response = await fetch(url)
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
  return await (response.json() as Promise<ResponseData>)
}

export async function remove(url: string): Promise<Response> {
  return await fetch(url, { method: 'DELETE' })
}
