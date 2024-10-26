export const fetchPlayerData = async () => {
    const response = await fetch('http://127.0.0.1:5000/api/playerProfileData')
    if (!response.ok) {
      throw new Error('Failed to fetch player data')
    }
    const data = await response.json()
    console.log("playerProfileData: ", data)
    return data
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