// pixabay-api.js
import axios from 'axios';

const API_KEY = '48303483-31cfd41ec7662904a2a6a727b';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
  const response = await axios.get(url);
  if (response.status !== 200) {
    throw new Error('Failed to fetch images');
  }
  return response.data;
}
