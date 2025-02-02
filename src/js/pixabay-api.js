import axios from 'axios';

const API_KEY = '48600448-a8625b0ee752919c612468958';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchPhotosByQuery = async (searchedQuery, page = 1, per_page = 15) => {
  const searchParams = new URLSearchParams({
    q: searchedQuery,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page,
    per_page,
  });

  const response = await axios.get(`${BASE_URL}?${searchParams}`);
  return response.data;
};
