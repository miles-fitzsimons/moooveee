export async function getData<Data>(
  endpoint: string,
  callback: (data: Data) => void,
  setError: (error: boolean) => void
) {
  return await fetch(`https://api.mevo.co.nz/public/${endpoint}/all`, {
    method: "GET",
    headers: new Headers({ Accept: "application/json" }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then((data) => callback(data))
    .catch(() => setError(true));
}
