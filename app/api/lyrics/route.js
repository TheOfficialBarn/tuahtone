import axios from 'axios';

// Function to fetch lyrics based on track and artist
export async function fetchLyrics(track, artist) {
  try {
    const response = await axios.get(`https://lyrist.vercel.app/api/${track}/${artist}`);
    return response.data.lyrics;
  } catch (error) {
    console.error("Error fetching lyrics:", error);
    throw error;
  }
}

// ...existing code...
