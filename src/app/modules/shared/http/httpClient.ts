export function httpClient<TResponse>(
  url: string,
  method: string,
  body?: any
): Promise<TResponse> {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  const token = sessionStorage.getItem('token');
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const fetchOptions: RequestInit = { method, headers };
  if (method === 'POST' || method === 'PUT')
    fetchOptions['body'] = JSON.stringify(body ?? {});
  return new Promise((resolve, reject) => {
    fetch(import.meta.env.VITE_API_URI + url, fetchOptions)
      .then(async (res) => {
        if (!res.ok) throw await res.json();
        try {
          return await res?.json();
        } catch {
          return res;
        }
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}
