export const fetchPlayerData = async () => {
    const response = await fetch('http://127.0.0.1:5000/api/playerProfileData')
    if (!response.ok) {
      throw new Error('Failed to fetch player data')
    }
    const data = await response.json()
    console.log("playerProfileData: ", data)
    return data
}

export const fetchPlayerData3 = async (route) => {
  const url = `http://127.0.0.1:5000/api/${route}`;
  console.log("Fetching data from URL: ", url);

  try {
    const response = await fetch(url);
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

export const fetchPlayerSearch = async (query) => {
  const url = `http://127.0.0.1:5000/api/playerSearch`;
  query = 'Hyuje#EUW';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      console.error(`Failed to post data. Status: ${response.status}, StatusText: ${response.statusText}`);
      throw new Error('Failed to post player data');
    }

    const data = await response.json();
    console.log("Posted data: ", data);
    return data;
  }
  catch (error) {
    console.error("Error posting data: ", error);
    throw error;
  }
}


export const fetchPlayerData2 = async (query) => {
  // Ensure query is provided
  if (!query) {
    query = 'Hyuje#EUW';
    // throw new Error('Query parameter is required');
  }

  // Post data to the server
  const postResponse = await fetch('http://127.0.0.1:5000/api/test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!postResponse.ok) {
    throw new Error('Failed to post player data');
  }

  // Parse the JSON response from the server
  const responseData = await postResponse.json();
  console.log('Response Data:', responseData);

  return responseData;
};


export const fetchRecentMatches = async () => {
    const response = await fetch('http://127.0.0.1:5000/api/playerMatchHistory')
    if (!response.ok) {
      throw new Error('Failed to fetch recent matches')
    }
    const data = await response.json()
    console.log("playerMatchHistory: ", data)
    return data
}