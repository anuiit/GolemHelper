export const fetchPlayerData = async (route, searchQuery) => {
  const url = `http://127.0.0.1:8000/api/${route}`;
  console.log("Fetching data from URL: ", url);
  if (!searchQuery) searchQuery = 'Hyuje#EUW';
  console.log("Search Query: ", searchQuery);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ searchQuery }),
    });
    if (!response.ok) {
      console.error(`Failed to fetch data. Status: ${response.status}, StatusText: ${response.statusText}`);
      throw new Error('Failed to fetch player data');
    }
    const data = await response.json();
    console.log("Fetched data: ", data);
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};