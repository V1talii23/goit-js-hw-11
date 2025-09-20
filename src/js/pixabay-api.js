import axios from 'axios';

const API_KEY = '52329840-3cdbe1d1ca17a86ceb553d9b5';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {};
axios.defaults.params['key'] = API_KEY;

export default function getImagesByQuery(query) {
  return axios
    .get('', {
      params: {
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 21,
      },
    })

    .then(res => res.data.hits);
}
