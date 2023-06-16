import axios from 'axios';

const KEY = '35616780-389f725697a1b8e578a276820';
const BASE_URL = 'https://pixabay.com/api/';

// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12
export const findImage = async (query, page) => {
  const { data } = await axios.get(
    `${BASE_URL}?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};
