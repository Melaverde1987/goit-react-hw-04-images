import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (currentPage, perPage, query) => {
  const params = new URLSearchParams({
    key: '39229770-f5b3eedca6043c874392c6e75',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: perPage,
  });

  const response = await axios.get(`/?${params}`);
  return response.data;
};
