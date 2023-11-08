export async function fetchUsers(
  page: number,
  result: number,
  nationalities: string[],
  filter: string,
) {
  let fetchURL = `https://randomuser.me/api/?page=${page}&results=${result}&seed=abc`;
  if(nationalities.length > 0) {
    fetchURL += `&nat=${nationalities.join(",")}`;
  }
  if(filter !== '') {
    fetchURL += `&name=${filter}`;
  }
  const response = await fetch(fetchURL);
  const data = await response.json();
  return data.results;
}

