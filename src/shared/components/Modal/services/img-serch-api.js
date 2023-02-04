import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '32018824-12fed2968cd63512e54ef9084',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const searchImage = async (search, page) => {
  const { data } = await instance.get('/', {
    params: {
      q: search,
      page,
    },
  });
  return data;
};
